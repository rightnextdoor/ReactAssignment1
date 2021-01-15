import React, { Component } from "react";
import { Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => (val) && (val.length > len);

  export class CommentForm extends Component{
    constructor(props){
      super(props);

      this.toggleModal = this.toggleModal.bind(this);

      this.state = {
        isModalOpen : false
      };
    }
    toggleModal(){
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render (){
      return(
      <React.Fragment>
        <Button color="secondary" outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>{' '}Add Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Submit
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit ={(values) => this.handleSubmit(values)} >
              <Row className="form-group">
                <Label md={12} htmlFor="rating">Rating</Label>
                <Col md={12}>
                  <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={12} htmlFor="name">Name</Label>
                <Col md={12}>
                  <Control.text
                    model=".name"
                    name="name"
                    className="form-control"
                    validators={{required, maxLength: maxLength(15), minLength: minLength(2)}} />
                </Col>
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages ={{
                    required: "This feild is mandatory",
                    maxLength: "  The name should have 15 or less characters",
                    minLength: "  The name should have atleast 3 characters"
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label md={12} htmlFor="comment">Comments</Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    className="form-control"
                    row="12" />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
      );
    }

  }

  function RenderDish({dish}) {
    return (
      <div className="col-12 mb-5">
      <FadeTransform
              in
              transformProps={{
                  exitTransform: 'scale(0.5) translateY(-50%)'
              }}>
          <Card>
              <CardImg top src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
          </FadeTransform>
      </div>
    );
  }

  function RenderComments({comments, postComment, dishId}) {
    if (comments != null) {
      const commentItem = comments.map((comment) => {
        return (
          <Stagger in>
                         {comments.map((comment) => {
                             return (
                                 <Fade in>
                                 <li key={comment.id}>
                                 <p>{comment.comment}</p>
                                 <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                 </li>
                                 </Fade>
                             );
                         })}
                         </Stagger>
        );
      });
      return (
        <div className="col-12">
          <h3>Comments</h3>
          <ul className="list-unstyled">{commentItem}</ul>
          <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  const DishDetail = (props) => {
    if (props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.errMess){
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }
    else if (props.dish != null) {
      return (
        <div className="container">
          <div className="row ">
          <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
          <div className="row">
            <div className="col">
            <RenderDish dish={props.dish}/>
            </div>
            <div className="col">
            <RenderComments comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}/>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

export default DishDetail;

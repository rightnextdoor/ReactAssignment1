import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

		}
    }





    renderDish(theDish) {
        if (theDish != null) {
            return(

                <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={theDish.image} alt={theDish.name} />
                        <CardBody>
                            <CardTitle>{theDish.name}</CardTitle>
                            <CardText>{theDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

            ) ;
        }else
            return(<div></div>);


    }

    renderComments(dishComments) {
        let arr = new Array();
        arr = dishComments;

        if (arr != null) {
            return (

                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>

                    <ul>
                        {dishComments.map( (comment) =>{

                            return (
                                <div>
                                    <li className="list-unstyled">
                                        <p>{comment.comment}</p>
                                        <p>--{comment.author} {comment.date.substring(0,10)}</p>
                                    </li>
                                </div>

                            );
                            })
                        }
                    </ul>

                </div>
            );
        }else
            return (<div></div>);
    }

    render() {
        const myDish = this.props.dish;


        if (myDish!=null) {
            return(

                <div className="row">

                    {this.renderDish(myDish)}


                    {this.renderComments(myDish.comments)}
                </div>
            ) ;
        }else
            return(<div></div>);
    }
}

export default DishDetail;

import React, { Component } from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ImageSearch extends Component {
    UploadandSearch(){
        console.log('Imag Search Button Clicked',this.state);
        let token = 'Token '+localStorage.getItem('userToken');
        console.log(token);
        
        let url = `http://127.0.0.1:8000/api/searchimage`;
        let form = new FormData()
        form.append('image',this.state.newImage)
        form.append('cropdata',this.state.crop)
        console.log(form);
        fetch(url,{
            method: 'POST',
            headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token
            },
            body: form
        }).then(response=>response.json())
        .then(jsonObj=>{console.log(jsonObj);
        }).catch(err=>{console.log(err);
        });
    }
    handleChangeFile(event) {
        let reader = new FileReader();
        reader.onload = (e) => {
        this.setState({newImage:e.target.result})
        };
        reader.readAsDataURL(event.target.files[0]);

        let token = 'Token '+localStorage.getItem('userToken');
        console.log(token);
        
        let url = `http://127.0.0.1:8000/api/searchimage`;
        let form = new FormData()
        form.append('image',event.target.files[0])
        // form.append('cropdata',this.state.crop)
        console.log(form);
        fetch(url,{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token
            },
            body: form
        }).then(response=>response.json())
        .then(jsonObj=>{console.log(jsonObj);
        }).catch(err=>{console.log(err);
        });
    }
    onImageLoaded = (image, pixelCrop) => {
        console.log('onImageLoaded', { image, pixelCrop });
        // this.setState({
        //   crop: makeAspectCrop({
        //     x: 0,
        //     y: 0,
        //     aspect: 10 / 4,
        //     width: 50,
        //   }, image.naturalWidth / image.naturalHeight),
        //   image,
        // });
    }
    onCropComplete = (crop, pixelCrop) => {
        console.log('onCropComplete', { crop, pixelCrop });
    }
    onCropChange = (crop, pixelCrop) => {
        // console.log('onCropChange', { crop, pixelCrop });
        this.setState({ crop });
    }
    constructor(props){
        super(props);
        // if(localStorage.getItem("userToken")==null){
        //     this.props.history.push("/");
        // }
        this.state = {
            newImage:"https://getuikit.com/v2/docs/images/placeholder_600x400.svg",
            crop: {
                x: 20,
                y: 10,
                width: 40,
                height: 40,
                // aspect: 16 / 9,
            },
            disabled: false,
        };
    }
    render() {
        return (
            <div>
                {/* <Image width="400px" src={this.state.newImage} responsive /> */}
                <ReactCrop
                crop={this.state.crop}
                disabled={this.state.disabled}
                // maxHeight={80}
                minHeight={20}
                minWidth={20}
                className="ACustomClassA ACustomClassB"
                src={this.state.newImage}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange} />
                <Form inline className="col-md-12 col-md-offset-4">
                    <FormGroup>
                        <ControlLabel>Select Image to Upload</ControlLabel>
                        { ' ' }
                        <FormControl name="image" type="file" onChange={this.handleChangeFile.bind(this)}/>
                        <br/>
                        <Button bsStyle="success"
                            onClick={()=>this.UploadandSearch()} >Crop and Search</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state);
    return {
        token: state.user
    }
}

export default connect(mapStateToProps,null)(ImageSearch);
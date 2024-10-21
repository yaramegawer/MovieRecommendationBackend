const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "UseName Is Required!"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate: {
            validator: function (value) {
                return /[A-Z]/.test(value) && /[0-9]/.test(value);
            },
            message: props => {
                console.log(props);
                return `${props.value} is not a valid password! Password must contain at least one uppercase letter and one number!`;
            }
        }
    }
});

module.exports=mongoose.model('User',userSchema);
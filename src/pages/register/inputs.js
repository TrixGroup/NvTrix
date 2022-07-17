export const inputs =[
    {
        id:1,
        label:'First Name',
        name:"firstName",
        type:'text',
        placeholder:'First Name',
        value:'',
        errorMessage:'First Name empty!',
        inputType:'input',
        menuItems:{},
        pattern:''
    },
    {
        id:2,
        label:'Last Name',
        name:"lastName",
        type:'text',
        placeholder:'Last Name',
        value:'',
        errorMessage:'Last Name empty!',
        inputType:'input',
        menuItems:{}
    },
    {
        id:3,
        label:'Username',
        name:"username",
        type:'text',
        placeholder:'Username',
        value:'',
        errorMessage:'Username Name empty!',
        inputType:'input',
        menuItems:{}
    },
    {
        id:4,
        label:'Email',
        name:"email",
        type:'email',
        placeholder:'Email',
        value:'',
        errorMessage:'Email empty!',
        inputType:'input',
        menuItems:{}
    },
    {
        value:'',
        errorMessage:'Phone Number empty!',
        id:5,
        label:'Phone Number',
        name:"phoneNumber",
        type:'text',
        placeholder:'Phone Number',
        inputType:'input',
        menuItems:{}
    },
    {
        id:6,
        label:'Gender',
        name:"sex",
        type:'select',
        value:'',
        errorMessage:'Gender is empty!',
        placeholder:'Gender',
        inputType:'select',
        menuItems:[
                {
                    id:1,
                    name:'female'
                },
                {
                    id:2,
                    name:'male'
                }
        ]
        
    },
    {
        id:7,
        label:'Country',
        name:"country",
        type:'select',
        value:'',
        errorMessage:'Country empty!',
        placeholder:'Country',
        inputType:'select',
        menuItems:[]
    },
    {
        id:8,
        label:'User Type',
        name:"userType",
        type:'select',
        value:'',
        errorMessage:'User Type empty!',

        placeholder:'who are you?',
        inputType:'select',
        menuItems:[
            {
                id:1,
                name:'passenger',
            },
            {
                id:2,
                name:'driver'
            }
        ]
    },
    {
        id:9,
        label:'Password',
        name:"password",
        type:'password',
        placeholder:'password',
        inputType:'input',
        menuItems:{},
        value:'',
        errorMessage:'Password Name empty!',
        password:true,

    },
    {
        id:10,
        label:'Confirm Password',
        name:"confirmPassword",
        type:'password',
        placeholder:'Confirm Password',
        value:'',
        errorMessage:'Password don\'t match!',
        inputType:'input',
        menuItems:{},
        password:true,

    },
];
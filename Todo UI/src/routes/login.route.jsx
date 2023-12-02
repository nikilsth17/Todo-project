import MinimumLayout from "../Layout/MinimumLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const loginRoutes=[
    {
        path:"/",
        element:<MinimumLayout/>,
        children:[
            {
                path:"/register",
                element:<RegisterPage/>
        
            },
            {
                path:"/login",
                element:<LoginPage/>
            },
        ],
    },
]
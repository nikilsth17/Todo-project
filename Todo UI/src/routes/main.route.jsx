import MainLayout from "../Layout/MainLayout";

import Home from "../pages/Home";

export const mainRoute=[
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/home",
                element:<Home/>
            },
            
        ]
    }
    
]
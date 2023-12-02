import axios from "axios";


const $axios= axios.create({
    baseURL:"http://localhost:8000",
    timeout: 5000,
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
    const accesstoken= localStorage.getItem("accesstoken");
    if (accesstoken){
        config.headers.Authorization= `Bearer ${accesstoken}`;
    }
    // Do something before request is sent
    return config;

  });


export {$axios};
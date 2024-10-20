<?php  

namespace App\Http\Middleware;  

use Illuminate\Foundation\Http\Kernel as HttpKernel;  

class Kernel extends HttpKernel  
{  
    /**  
     * The application's global HTTP middleware stack.  
     *  
     * These middleware are run during every request to your application.  
     *  
     * @var array  
     */  
    protected $middleware = [  
        // \App\Http\Middleware\TrustHosts::class,  
        \App\Http\Middleware\TrustProxies::class,  
        \Fruitcake\Cors\HandleCors::class,  
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,  
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,  
        \App\Http\Middleware\TrimStrings::class,  
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,  
    ];  

    // Resto del código...  
}
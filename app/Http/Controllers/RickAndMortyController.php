<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RickAndMortyController extends Controller
{
    public function index($id = null)
    {
        $query = http_build_query(request()->query());
        return view('main', ["query" => $query]);
    }
}

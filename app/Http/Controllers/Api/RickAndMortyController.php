<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Controllers\Controller;

class RickAndMortyController extends Controller
{
    public static $api_url = 'https://rickandmortyapi.com/api';

    static function getUrl($type, $query, $options = []) : string
    {
        $validFilters = ['page', 'name', 'status', 'species', 'type', 'gender'];
        $url = self::$api_url . "/$type";

        if(!empty($options["id"])) {
            $url .= "/".$options["id"];
        }

        if(!empty($query)) {
            foreach($query as $key => $value) {
                $url .= strpos($url, '?') ? '&' : '?';
                if(in_array($key, $validFilters)) {
                    $url .= "$key=$value";
                }
            }
        }

        return $url;
    }

    public static function characters($id = null) : \Illuminate\Http\JsonResponse
    {
        $query = request()->query();
        $options = [];
        if($id) {
            $options['id'] = $id;
        }

        $url = self::getUrl('character', $query, $options);
        try {
            $client = new Client();
            $response = $client->request('GET', $url);
            $characters = json_decode($response->getBody()->getContents());
            return response()->json($characters);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}

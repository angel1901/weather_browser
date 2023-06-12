<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class WeatherController extends Controller
{
    public function index()
    {

        return Inertia::render('Home');
    }

    public function show($id)
    {
        $history = DB::table('history')->where('id', $id)->get();

        return Inertia::render('Home', [
            'history' => $history
        ]);
    }

    public function search($city)
    {
        try {
            $API_KEY = env('API_KEY');

            if (empty($API_KEY)) {
                throw new \Exception('No se encontro llave');
            }

            $limit = 1;
            $arr_response = [];

            $url = 'http://api.openweathermap.org/geo/1.0/direct?q=' . $city . '&limit=' . $limit . '&appid=' . $API_KEY;
            $http = Http::get($url);
            $response = $http->json();
            foreach ($response as $res) {
                $url = 'https://api.openweathermap.org/data/2.5/weather?lat=' . $res['lat'] . '&lon=' . $res['lon'] . '&appid=' . $API_KEY;
                $http = Http::get($url);
                $response = $http->json();

                $data['name'] = $res['name'];
                $data['geocode'] = [$res['lat'], $res['lon']];
                $data['humidity'] = $response['main']['humidity'];
                $data['main'] = $response['main'];
            }
            array_push($arr_response,  $data);

            $history_controller = new HistoryController();
            $history_controller->store($arr_response);

            return response()->json(['message' => $arr_response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}

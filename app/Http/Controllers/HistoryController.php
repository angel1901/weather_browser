<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {

        $history = DB::table('history')->orderBy('id', 'DESC')->get();


        return Inertia::render('History', [
            'history' => $history
        ]);
    }

    public function store($data)
    {
        $history = new History();

        foreach ($data as $city) {
            $history->city = $city['name'];
            $history->humidity = $city['humidity'];
            $history->data = json_encode($data);
        }

        if (!$history->save()) {
            throw new \Exception('No se pudo guardar');
        }

        return 'true';
    }
}

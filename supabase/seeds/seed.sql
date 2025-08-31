

--
-- Data for Name: gestures; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."gestures" ("id", "name", "description", "image_path", "created_at") VALUES
	('0ea75feb-482f-4612-97ae-c0229b12000d', 'Cambio ilegal', 'Sanción menor: 2 min- Más de 4 en pista o cambio antes de 3m del banquillo. Si es deliberado en los 2 últimos min → penalti.', '6_en_pista.png', '2025-08-28 12:14:29.78352+00'),
	('98e0e2a6-0aa6-4ed3-809d-d803211297b0', 'Agarrar', 'Sanción menor: 2 min. Sujetar a un rival e impedirsu movimiento. Puede sancionarse con 5 min + malaconducta.', 'agarrar.png', '2025-08-28 12:14:29.78352+00'),
	('4888c834-b8aa-460f-924d-4b66ac838fbd', 'Cambio', 'Cambio de jugadores Equipo visitante tiene cinco segundos para realizar cambio. El equipo local dispone de cinco segundos más.', 'cambio.png', '2025-08-28 12:14:29.78352+00'),
	('b0799d58-ddaa-4b97-8083-994bc1351490', 'Carga', 'Sanción menor: 2 min. Embestir a un rival corriendo, saltando o empujando con el cuerpo. Si es peligrosa o causa lesión→5 min+ MCJ.', 'carga.png', '2025-08-28 12:14:29.78352+00'),
	('4ab88aec-05fa-4460-b7bb-5f74cc87c210', 'Carga con el stick', 'Sanción menor: 2 min. SS. Empujar a un rival con el stick. Si hay lesión→5 min+ MCJ. A la 3ª sanción de stick: expulsión (otro cumplela penalización).', 'carga_con_stick.png', '2025-08-28 12:14:29.78352+00'),
	('22803478-42c2-4d87-b6bd-47c7507cbc11', 'Carga por la espalda', 'Sanción menor: 2 min. Cargar por la espalda a un rival. Si lesión→expulsión 5 min + MCJ.', 'carga_por_detras.png', '2025-08-28 12:14:29.78352+00'),
	('e4980de0-b474-487a-8904-b40de8e7debb', 'Codazo', 'Sanción menor: 2 min. Uso del codo para golpear a un adversario. Si causa lesión→expulsión de5 min + MCJ.', 'codazo.png', '2025-08-28 12:14:29.78352+00'),
	('f1a630e5-e811-4c7e-b6d3-b7b3c31b2ad2', 'Conducta antideportiva', 'Sanción mayor de 10 min. Conducta antideportiva o retraso. Reincidencia: expulsión. Portero cruza mediocampo→2 min. Mover porteŕıa al final→penalti.', 'antideportiva.png', '2025-08-28 12:14:29.78352+00'),
	('a8acfb84-8070-483e-a417-1c53b85a9286', 'Enganchar', 'Sanción menor: 2 min. Cuando un jugador sujeta con el stick al adversariopara impedirle avanzar. Si lesión → expulsión de5 min + MCJ.', 'enganche.png', '2025-08-28 12:14:29.78352+00'),
	('92bace0b-08d1-45f4-950c-e44ebc8683f5', 'Gol', 'Saque de centro. Se cancela la primera penalización menor del equipo querecibe el gol. Si la penalización es mayor o de mala conducta, no se cancela.', 'gol.png', '2025-08-28 12:14:29.78352+00'),
	('ffeff8c9-b25b-46a1-a29c-4bb9033e0bc3', 'Golpear conel taco', 'Sanción mayor: 5 min + MCJ. SS.  Golpear con el taco del stick. A la 3ª sanción de stick:expulsión (otro cumple lapenalización).', 'golpear_taco.png', '2025-08-28 12:14:29.78352+00'),
	('67fad99d-3312-4478-9af2-ff79073e48fc', 'Golpear puntadel stick', 'Doble menor de 2+2 min SS Golpear con la punta delstick. Si hay lesión → pena-lización de partido. A la 3ªsanción de stick: expulsión(otro cumple la penalización)', 'golpear_stick.png', '2025-08-28 12:14:29.78352+00'),
	('70961bf3-8c4f-4fbb-9e89-e6016bc1a1ed', 'Penalización de partido', 'Expulsión El jugador es expulsadoel resto del encuentro por infracción grave, acumulaciónde faltas o mala conducta.Un sustituto cumple 5 minpor él.', 'penalizacion_de_partido.png', '2025-08-28 12:14:29.78352+00'),
	('424261be-1269-4eb2-a2c7-fd7d74424aec', 'Penalización diferida', 'Equipo sin el puck hace falta El juego sigue hasta que elequipo infractor recupereel puck. Si se marca lapenalización menor no secumple', 'diferida.png', '2025-08-28 12:14:29.78352+00'),
	('f31db28a-cf96-4f27-a552-0273dadf25b6', 'Interferencia', 'Sanción menor: 2 min. Obstaculizar a un rival sin posesión del puck. Si provoca lesión → expulsiónde 5 min + MCJ.', 'interferencia.png', '2025-08-28 12:14:29.78352+00'),
	('f9a58058-4182-4c13-a579-9a144aaf672c', 'Jugador en el área', 'Saque de centro. Si un atacante entra sin pucko sin ser empujado por undefensor, el juego se detieney el saque neutral se realizaen el centro de la pista', 'area.png', '2025-08-28 12:14:29.78352+00'),
	('5026602a-8263-460b-a6e2-590941bb1e18', 'Mala conducta', 'Expulsión 10 min Lenguaje, gestos o protestasreiteradas. Se le sustituye,aśı que no deja al equipo eninferioridad.', 'mala_conducta.png', '2025-08-28 12:14:29.78352+00'),
	('bb22f6a4-b5b9-41a6-84d4-e0d1eaa8a5c8', 'No gol, no falta', 'El juego continua. Ante una situación confusael árbitro señala que no hay gol o no hay falta', 'no_gol.png', '2025-08-28 12:14:29.78352+00'),
	('2aa9ff12-e743-4f1f-a5e7-d659d0ade199', 'Pase con la mano', 'Saque neutral. Saque neutral en el centro si el pase con la mano fue enzona de ataque o en la zona más cercana si ocurrió en defensa', 'pase_con_la_mano.png', '2025-08-28 12:14:29.78352+00'),
	('0c5b6c5a-9301-4327-ada7-51ea35095e97', 'Rodillazo', 'Sanción menor: 2 min. Uso de la rodilla para derribar o golpear al rival.Si lesión → expulsión de5 min + MCJ..', 'rodillazo.png', '2025-08-28 12:14:29.78352+00'),
	('c82bb9e6-a987-4e42-901e-63a78f6c7a98', 'Slashing', 'Sanción menor: 2 min. SS Golpear o intentar golpearcon el stick. Si lesión →expulsión de 5 min + MCJ.', 'slashing.png', '2025-08-28 12:14:29.78352+00'),
	('a7f62b45-53e6-4d49-8c57-34d9c1f081d4', 'Stick alto', 'Sanción menor: 2 min. SS Usar el stick por encimade los hombros y tocar o poner en peligro a un rival.Si lesión → expulsión de5 min + MCJ.', 'stick_alto.png', '2025-08-28 12:14:29.78352+00'),
	('fbb5389f-b877-47db-ae1f-15e6b9556646', 'Tiempo Muerto', 'El juego se para 3 min. Solo lo puede solicitar el capitán, los asistentes o ele ntrenador', 'tiempo_muerto.png', '2025-08-28 12:14:29.78352+00'),
	('c4a9daab-4313-4b6c-851d-5bc76cafb32a', 'Tiro de penalti', '1 vs portero El jugador designado avanza desde el centro y tira. Tras el tiro: saque en el centro. Si hay gol→no se aplica lasanción menor.', 'penalti.png', '2025-08-28 12:14:29.78352+00'),
	('cc86d91b-5b58-46e6-b038-0eaa4f77d6c8', 'Violencia innecesaria', 'Sanción menor: 2 min. Golpes o choques demasiado fuertes sin necesidad. Si lesión → expulsión de5 min + MCJ.', 'violencia_innecesaria.png', '2025-08-28 12:14:29.78352+00'),
	('6bdaed7a-891c-46f6-8f3a-2454cd530859', 'Zancadilla', 'Sanción menor: 2 min. Hacer tropezar a un rivalcon stick, pie o cuerpo.Si lesión → expulsión de5 min + MCJ.', 'zancadilla.png', '2025-08-28 12:14:29.78352+00');


--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."leaderboard" ("id", "player_name", "score", "created_at") VALUES
	('ec27dd3a-6506-4b01-aebb-621b178b16a5', 'ALONSO', 6, '2025-08-30 12:15:08.906253+00');



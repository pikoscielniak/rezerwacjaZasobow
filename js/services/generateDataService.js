/*global angular,console*/

angular.module('project.services')
    .factory('generateData', ['reservations', 'resources', 'users', function(reservations, resources, users){
        "use strict";

        var manSurname = ['Nowak','Kowalski','Wiśniewski','Wójcik','Kowalczyk','Kamiński','Lewandowski','Zieliński','Woźniak','Szymański','Dąbrowski','Kozłowski','Jankowski','Mazur','Kwiatkowski','Wojciechowski','Krawczyk','Kaczmarek','Piotrowski','Grabowski','Zając','Pawłowski','Król','Michalski','Wróbel','Wieczorek','Jabłoński','Nowakowski','Majewski','Olszewski','Stępień','Dudek','Jaworski','Malinowski','Adamczyk','Pawlak','Górski','Nowicki','Sikora','Witkowski','Walczak','Rutkowski','Baran','Michalak','Szewczyk','Ostrowski','Tomaszewski','Zalewski','Wróblewski','Pietrzak'];
        var manName = ['Jakub','Kacper','Szymon','Mateusz','Filip','Michał','Bartosz','Wiktor','Piotr','Dawid','Adam','Maciej','Jan','Igor','Mikołaj','Patryk','Paweł','Dominik','Oskar','Antoni','Wojciech','Kamil','Aleksander','Krzysztof','Oliwier','Oliwier','Marcel','Karol','Franciszek','Tomasz','Maksymilian','Hubert','Bartłomiej','Adrian','Alan','Sebastian','Miłosz','Krystian','Łukasz','Nikodem','Gabriel','Marcin','Stanisław','Damian','Konrad','Daniel','Fabian','Błażej','Rafał','Tymoteusz','Ksawery'];

        var womanName = ['Julia','Maja','Zuzanna','Wiktoria','Wiktoria','Oliwia','Amelia','Natalia','Aleksandra','Lena','Nikola','Zofia','Martyna','Weronika','Anna','Emilia','Magdalena','Hanna','Karolina','Gabriela','Alicja','Maria','Nadia','Kinga','Paulina','Milena','Patrycja','Klaudia','Agata','Marta','Laura','Dominika','Katarzyna','Antonina','Małgorzata','Michalina','Daria','Daria','Roksana','Kornelia','Joanna','Iga','Kamila','Jagoda','Sandra','Nina','Izabela','Pola','Barbara','Malwina','Justyna','Blanka'];
        var womanSurname = ['Nowak','Kowalska','Wiśniewska','Wójcik','Kowalczyk','Kamińska','Lewandowska','Zielińska','Szymańska','Woźniak','Dąbrowska','Kozłowska','Jankowska','Mazur','Mazur','Wojciechowska','Kwiatkowska','Krawczyk','Piotrowska','Kaczmarek','Grabowska','Pawłowska','Michalska','Zając','Król','Wieczorek','Jabłońska','Nowakowska','Wróbel','Majewska','Olszewska','Jaworska','Adamczyk','Stępień','Malinowska','Nowicka','Górska','Dudek','Witkowska','Pawlak','Rutkowska','Walczak','Sikora','Michalak','Ostrowska','Szewczyk','Baran','Baran','Tomaszewska','Pietrzak','Wróblewska','Zalewska'];

        var resourceName = ['koń','mysz','pies','stół','bąk','kwadrat','dom','łąka','byk','ręcznik','plecak','książka','płta','perfumy','długopis','ławka','blok','słoń','komoda','laptop','kabel','puszka','łyżka','ręka','ucho','kolczyk','bluzka','koc','buty','kot','piasek','lawa','rekin','szuflada','figurka','biurko','mata','woda','kanapka','wózek','lalka','gitara','bębny','pianino','talerz','puzzle','tygrys','miś','linoleum','naklejka','folder','plik','lista','zegar','lis','jak(zwierze)','motyl','klawiatura','kamera','aparat','telefon','kabaretki','pończochy','sukienka','żółw','ryba','ość','lód','schabowe','sałatka','samochód','samolot','pociąg','metro','statek','kamizelka','zdjęcie','sznurek','łańcuszek','bransoletka','obroża','sierść','naczynia','zlew','kuchenka','akwarium','wata','poduszka','prześcieradło','zakrętka','opaska','chustka','smoczek','muszla','globus','mikroskop','kurtka','obraz','karma','rura','gumka','lada','piórnik','włącznik','mop','miotła','kosz'];

        var colors = ["biały", "alabastrowy", "mleczny", "kremowy", "perłowy", "porcelanowy", "amarantowy", "arbuzowy", "łososiowy", "majtkowy", "malinowy", "pąsowy", "różowy", "rubinowy", "buraczkowy", "ceglasty", "czerwony", "karmazynowy", "karminowy", "makowy", "poziomkowy", "rdzawy", "rudy", "szkarłatny", "truskawkowy", "wiśniowy", "brzoskwiniowy", "bursztynowy", "brązowy", "cynamonowy", "herbaciany", "koralowy", "marchewkowy", "miedziany", "miodowy", "morelowy", "pomarańczowy", "złocisty", "beżowy", "brunatny", "czekoladowy", "heban, hebanowy", "kakaowy", "kasztanowy", "mahoń, mahoniowy", "orzechowy", "spiżowy", "tabaczkowy", "bananowy", "cytrynowy", "kanarkowy", "piwny", "siarkowy", "słomkowy", "szafranowy", "złoty", "żółty", "malachitowy", "miętowy", "oliwkowy", "patynowy", "pistacjowy", "seledynowy", "szmaragdowy", "trawiasty", "zielony", "atramentowy", "chabrowy", "kobaltowy", "lazurowy", "modry", "siny", "szafirowy", "turkusowy", "lawendowy", "ametystowy", "fioletowy", "fiołkowy", "jagodowy", "purpurowy"];
        var description = ["bezbarwny", "błyszczący", "brudny", "brzydki", "cichy", "ciekawy", "ciemny", "cieńki", "cudowny", "czysty", "długi", "drewniany", "dziwny", "foliowy", "głęboki", "kwadratowy", "lojalny", "ładny", "łatwopalny", "łatwy w obsłudze", "metalowy", "miękki", "niebezpieczny", "niewiarygodny", "niewygodny", "niski", "nudny", "okrągły", "okropny", "ostry", "płaski", "płytki", "porcelanowy", "prosty", "przezroczysty", "puchowy", "pusty", "puszysty", "rozerwany", "roześmiany", "skomplikowany", "stabilny", "stary", "suchy", "szeroki", "twardy", "ugotowany", "upieczony", "użyteczny", "wąski", "wiśniowy", "wklęsły", "wygodny", "wypukły", "wysoki", "zepsuty", "zjadliwy", "złamany", "żelazny"];

        var titles = ["pożyczam", "potrzebuję", "czy mogę", "rezerwuję", "wypożyczam", "wynajmuję", "chcę"];

        var allUsers = [];
        var allResources = [];

        var allAll = [manName, manSurname, womanName, womanSurname, resourceName, colors, description, titles];

        users.get().then(function(response){
            allUsers = response;
        });

        resources.get().then(function(response){
            allResources = response;
        });

        var random= function(arr){
            return arr[Math.floor(Math.random()*arr.length)];
        };

        var randomName = function(){
            if(Math.random() > 0.5){
                return random(womanName)+" "+random(womanSurname);
            } else {
                return random(manName)+" "+random(manSurname);
            }
        };

        var randomDates = function(){
            var year = 2012+Math.floor(Math.random()*3);
            var month = Math.floor(Math.random()*12);
            var day = Math.floor(Math.random()*31);
            if(Math.random()> 0.7){
//                one day event
                var hour = Math.floor(Math.random()*24);
                var endHour = hour+Math.floor(Math.random()*(38));
                return [new Date(year, month, day, hour), new Date(year, month, day, endHour)];
            } else {
                var endDay = day+Math.pow(2.718, -Math.random())*14;
                return [new Date(year, month, day), new Date(year, month, endDay)];
            }
        };

        var addResources = function(num){
            if(num === 0){
                console.log("Add resources finished.");
            } else {
                var color = random(colors);
                var resource = {
                    name: color+" "+random(resourceName),
                    description: color+", "+random(description)+", "+random(description)+", "+random(description),
                    color: "#"+(Math.floor((Math.random()*16777216))).toString(16)
                };
                resources.create(resource).then(function(){
                    num -= 1;
                    addResources(num);
                },function(error){
                    console.log(error);
                });
            }
        };

        var addUsers = function(num){
            if(num === 0){
                console.log("Add users finished.");
            } else {
                var user = {
                    name: randomName()
                };
                users.create(user).then(function(){
                    num -= 1;
                    addUsers(num);
                },function(error){
                    console.log(error);
                });
            }
        };

        var addReservations = function(num){
            if(num === 0){
                console.log("Add reservations finished.");
            } else {
                var user = random(allUsers);
                var resource = random(allResources);
                var dates = randomDates();
                var reservation = {
                    title: random(titles)+" "+resource.name,
                    description: random(random(allAll))+" "+random(random(allAll))+" "+random(random(allAll))+" "+random(random(allAll))+" "+random(random(allAll))+" "+random(random(allAll)),
                    start: dates[0],
                    end: dates[1],
                    user: user._id,
                    resource: resource._id
                };
                reservations.create(reservation).then(function(){
                    num -= 1;
                    addReservations(num);
                },function(error){
                    console.log(error);
                });
            }
        };

        return {
            resources: addResources,
            users: addUsers,
            reservations: addReservations
        };
    }]);

angular.module('smw-l10n', ['l10n']).config(['l10nProvider', function(l10n){
    l10n.add('en-us', {
        general: {
            startBtn: "Start Now"
        },
        header: {
            home: 'Home',
            exercises: 'Learn The Exercises',
            infos: 'What is this ?!'
        },
        exercises: {
            intro: 'Exercises are performed for 30 seconds, with 10 seconds of transition time between bouts. Total time for the entire circuit workout is approximately 7 minutes. The circuit can be repeated 2 to 3 times.'
        }
    });
    l10n.add('fr-fr', {
        general: {
            startBtn: "Commencer"
        },
        header: {
            home: 'Accueil',
            exercises: 'Voir les exercices',
            infos: "C'est quoi ?"
        },
        exercises: {
            intro: 'Les exercices durent tous 30sec, avec 10sec de pause entre chaque. Le temps total du programme est donc approximativement 7 minutes. Le programme peut être répété 2 à 3 fois.'
        }
    });
}]);


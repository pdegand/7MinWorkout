
angular.module('smw-l10n', ['l10n']).config(['l10nProvider', function(l10n){
    l10n.add('en-us', {
        general: {
            startBtn: "Start Now"
        },
        header: {
            home: 'Home',
            exercises: 'Learn The Exercises',
            infos: 'About'
        },
        exercises: {
            intro: 'Exercises are performed for 30 seconds, with 10 seconds of transition time between bouts. Total time for the entire circuit workout is approximately 7 minutes. The circuit can be repeated 2 to 3 times.'
        },
        footer: {
            created: 'Created by'
        },
        modal: {
            welcome: 'Welcome at 7MinWorkout.net !',
            p1: 'Before starting this 7-Minutes workout, you definitely should start by learning the different exercises.',
            p2: 'Click on the button bellow to start learning the exercises !',
            button: 'Learn The Exercises',
            continue:'Continue'
        },
        congratulation: {
            again: 'Do it again !',
            gg: 'Don\'t forget that you won\'t get results if you are not doing this 7MinWorkout every day !'
        }
    });
    l10n.add('fr-fr', {
        general: {
            startBtn: "Commencer"
        },
        header: {
            home: 'Accueil',
            exercises: 'Voir les exercices',
            infos: "A propos",

        },
        exercises: {
            intro: 'Les exercices durent tous 30sec, avec 10sec de pause entre chaque. Le temps total du programme est donc approximativement 7 minutes. Le programme peut être répété 2 à 3 fois.'
        },
        footer: {
            created: 'Crée par'
        },
        modal: {
            welcome: 'Bienvenue sur 7MinWorkout.net !',
            p1: 'Avant de commencer votre entrainement de 7 minutes, vous devriez commencer par apprendre les exercises.',
            p2: 'Cliquez sur le bouton ci-dessous pour accéder à la liste des exercises !',
            button: 'Apprendre Les Exercises',
            continue:'Continuer'
        },
        congratulation: {
            again: 'Recommencer !',
            gg: 'N\'oubliez pas que vous n\'aurez pas de résultats si vous ne suivez pas 7MinWorkout tous les jours !'
        }
    });
}]);


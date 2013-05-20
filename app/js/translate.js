
angular.module('smw-l10n', ['l10n']).config(['l10nProvider', function(l10n){
    l10n.add('en-us', {
        header: {
            home: 'Home',
            exercises: 'Learn The Exercises',
            infos: 'What is this ?!'
        }
    });
    l10n.add('fr-fr', {
        header: {
            home: 'Accueil',
            exercises: 'Voir les exercices',
            infos: "C'est quoi ?"
        }
    });
}]);


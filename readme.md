# Optimal Flights ✈
#### Permet de comparer les prix des vols à l'aide de graphes 📈

![N|transavia-logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Transavia_logo.svg/1920px-Transavia_logo.svg.png)

💡 L'idée c'est que l'oeil humain récolte plus d'informations en regardant plutot un schéma que de simple chiffres. C'est pourquoi donc un graphe est idéal pour repérer le plus bas prix d'un vol.

## Manual court :
- Séléctionner le `IATA airport code` (CDG ou ORY pour Paris par exemple)
- Séléctionner combien de `jours` à afficher à partir `date` donnée.
- Voilà ✨ ! Un graphe représentant les prix en fonctions des jours est tracé.

 ## Manual complet avec un exemple d'utilisation : 
 Prenons à titre d'exmple un scénatio ou je veux chopper un vol pas cher vers porto depuis Paris. Je serai disponible à partir du 24 mars, et je suis assez fléxible par rapport à la date de départ. Je regarde donc les prix sur une periode de 10 jours pour y voir mieux :

 ![N|Solid](/assets_readme/selecting.gif)
- ##### Suggestion des meilleurs prix 🤑
En regardant le graphes je pourrais repérer directement le vol au prix minimal sur la durée. Cependant si jamais la date du vol optimal ne m'arrange pas, je choisis alors un autre vol toujours dans la bande verte délimité par l'intervale [min, moyenne]
![N|Solid](/assets_readme/bande_verte.jpg)
En dehors de cette zone verte les prix deviennet moins intéréssants.
> En survolant un vol j'ai l'heure de départ et de l'arrivée

- ##### Weekends en surbillance 
Un scénraio typique d'un voyage est de faire un pond sur un weekend... J'ai la possibilité de les mettre en surbrillance (profitez de vos weekends 🙆) 
- ##### Je personnalise mon graphes
S'il y a trop d'informations affichées, je pense à désactiver ce qui n'est pas utile pour moi.
![N|Solid](/assets_readme/custom.gif)
Il est malin de laisser à vue d'oeil les deux graphes aller et retour ensemble afin de  choisir une combinaison idéal (cheap, cheap)👍 
> Un vol aller moins cher suivi d'un vol retour qui est lui cher ne m'intéresse pas (cheap, exepensive) 👎

- ##### Je choisis les vols optimaux
Dans notre exemple, je peux remarquer déjà que les weekends(🔸) sont assez cher... autant partir là ou les prix sont bas : 
![N|Solid](/assets_readme/choose.gif)
La séléction fera un total de 69 € pour 2 jours
- ##### Procéder à la réservation : 
J'ai plus de détails sur les vols choisit, et je peux réserver sur le site de la compagnie airéenne en suivant le lien dans ✈ Book.

![N|Solid](/assets_readme/proceder.jpg)

## Conclusion
Dans un worste-case-scenario 2 jours à Porto aurait couté plus de 350 € !! C'est le cas j'aurais fait la réservation direcement depuis un moteur de recherche ou sur le site de la compagnie airéenne par exmple. Ce mauvais choix est causé par le manque de `visibilité` 
![N|Solid](/assets_readme/pire.jpg)
Apres tout Optimal Flights apporte un concept simple mais ignoré par la plupart des gens ... c'est le concept de **la visibilité**




## License

MIT


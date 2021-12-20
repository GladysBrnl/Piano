/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image("fond","assets/fondnoir.png");
        this.load.image("man","assets/man_1.png");
    }

    /**
     * Crée la scène
     */
    create(){

        //met en place les éléments
        this.creerFormes();

        /**
         * Liste des lettres
         * @type {string[]}
         */
        this.lettres="azertyuiopqsdfghjklmwxcvbn".split("")
        console.log("liste des touches prises en charge...");
        console.log(this.lettres);

        // pour chaque lettre on va créer un élément graphique
        this.creerClavier();


        //initialise les écoutes de touches pressées et relâchées
        this.initKeyboard();

        /**
         * influera sur la vitesse de rotation
         * modifié par les touches J K L M
         * @type {number}
         */
        this.vitesse=1;
    }

    /**
     * Affiche les lettres du clavier
     * histoire de voir ce qui se passe
     */
    creerClavier(){
        //espacement entre les lettres = largeur de la scène / nombre de lettres
        let espacement = (this.game.config.width-2) / this.lettres.length; // -2 c'est pour avour une petite marge d'un pixel
        let x=1;
        for(let lettre of this.lettres){
            let objetGraphique=this.add.text(x,1,lettre,{
                color:"#FFFFFF", //blanc
                align:"center",
                backgroundColor:"#000000", //noir
                fixedWidth:espacement-1  // -1 c'est pour avoir une petite marge d'un pixel entre les lettres
            });
            //position X de la rouche suivante
            x+=espacement;
            //donne un nom à l'élément graphique
            objetGraphique.name=lettre;
        }
    }
    /**
     * Crée le décor
     */
    creerFormes(){
        this.fond=this.add.image(300,300,"fond");
        this.carre=this.add.image(100,300,"carre");
        this.croix=this.add.image(300,300,"croix");
        this.triangle=this.add.image(500,300,"triangle");
        this.man=this.add.image(550,300,"man");
        this.carre.blendMode=Phaser.BlendModes.ADD;
        this.croix.blendMode=Phaser.BlendModes.ADD;
        this.triangle.blendMode=Phaser.BlendModes.ADD;
    }



    /**
     * Définit ce qui se passe quand on appuie ou relache une touche du clavier
     * ALGO : ceci est une fonction ou méthode
     */
    initKeyboard(){
        /**
         *
         * @type {Tableau1}
         */
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            console.log("keydown",kevent.key,kevent)
            for(let lettre of me.lettres){
                if(kevent.key === lettre){
                    /**
                     *
                     * @type {Phaser.GameObjects.Text}
                     */
                    let objetGraphique=me.children.getByName(lettre);
                    objetGraphique.toucheEnfoncee=true;

                }
            }

        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            console.log("keyup",kevent.key,kevent)
            for(let lettre of me.lettres){
                if(kevent.key === lettre){
                    /**
                     * Obtenir la touche à partir de la lettre
                     * @type {Phaser.GameObjects.Text}
                     */
                    let touche=me.children.getByName(lettre);
                    touche.toucheEnfoncee=false;
                    touche.actif=!touche.actif; //alterne un fois ce sera actif, une fois ça le sera plus.
                    //appelle une fonction
                    me.quandToucheRelachee(kevent.key,touche)
                }
            }

        });
    }

    /**
     * Faire une action quand une touche est relachée
     * @param {string} lettre Une lettre (a,b,c,etc...)
     * @param objetGraphique Un objet qui représente une touche
     */
    quandToucheRelachee(lettre,objetGraphique){

        //------------couleurs---------------


        if(lettre==="a"){

            this.man.clearTint();
        }
        if(lettre==="z"){

            this.man.setTintFill(0xFF0000);
        }
        if(lettre==="e"){

            this.man.setTintFill(0x00FF00);
        }
        if(lettre==="r"){

            this.man.setTintFill(0x0000FF);
        }


        //simple feedback & changement de sens géré par actif dans update()
        if(lettre==="t"){
            this.bounce(this.man);
        }


    }

    /**
     * Cette fonction s'exécute en boucle (à peu près 60 fois par secondes)
     */
    update(){

        //pour chacune des lettres on va tester si il faut faire des choses ou non
        for(let lettre of this.lettres){

            //--- interaction sur le clavier ---

            /**
             * La touche qui correspond à la lettre
             * @type {Phaser.GameObjects.Text}
             */
            let touche=this.children.getByName(lettre);
            //si enfoncée le fond de touche est gris
            if(touche.toucheEnfoncee){
                touche.setBackgroundColor("#888888")
            }else{
                touche.setBackgroundColor("#000000")
            }
            //si actif le texte est vert sinon blanc
            if(touche.actif){
                touche.setColor("#00FF00")
            }else{
                touche.setColor("#FFFFFF")
            }

        }
    }


    /**
     * Fait rebondir un élément
     * @param {Phaser.GameObjects.Image} element
     */
    bounce(element){
        let actualScale=element.scale;
        element.setScale(actualScale+0.5)
        this.tweens.add({
            targets:[element],
            duration:100,
            ease:Phaser.Math.Easing.Bounce.Out,
            scale:actualScale
        })
    }

}

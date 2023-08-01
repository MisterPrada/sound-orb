import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from './Environment.js'

import Sphere from './Sphere.js'
import Text from './Text.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera;
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.html = this.experience.html
        this.sound = this.experience.sound
        this.debug = this.experience.debug.debug

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.html.playButton.classList.add("fade-in");
            this.html.playButton.addEventListener('click', () => {

                this.html.playButton.classList.replace("fade-in", "fade-out");
                this.sound.createSounds();

                setTimeout(() => {
                    this.experience.time.start = Date.now()
                    this.experience.time.elapsed = 0

                    // Setup
                    if ( this.debug )
                        this.text = new Text()
                    this.sphere = new Sphere()
                    this.environment = new Environment()

                    // Remove preloader
                    this.html.preloader.classList.add("preloaded");
                    setTimeout(() => {
                        this.html.preloader.remove();
                        this.html.playButton.remove();
                    }, 2500);

                    // Animation timeline
                    this.animationPipeline();
                }, 100);
            }, { once: true });
        })
    }

    animationPipeline() {
        if ( this.text )
            this.text.animateTextShow()
    }

    resize() {
        // if (this.godRays)
        //     this.godRays.resize()
    }

    update()
    {
        if ( this.sound )
            this.sound.update()

        if(this.sphere)
            this.sphere.update()

        if(this.text)
            this.text.update()
    }
}

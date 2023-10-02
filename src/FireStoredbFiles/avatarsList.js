import bullbasaur from '../assets/bullbasaur.png';
import caterpie from '../assets/caterpie.png';
import ditto from '../assets/ditto.png';
import eball from '../assets/eball.png';
import eggIncubator from '../assets/egg-incubator.png';
import gunger from '../assets/gunger.png';
import mankey from '../assets/mankey.png';
import meowth from '../assets/meowth.png';
import pikachu from '../assets/pikachu.png';
import pokemonGo from '../assets/pokemon-go.png';
import psyduck from '../assets/psyduck.png';
import seal from '../assets/seal.png';
import snorlax from '../assets/snorlax.png';
import superball from '../assets/superball.png';
import ultraBall from '../assets/ultra-ball.png';
import zubat from '../assets/zubat.png';
import ethan from '../assets/crown.png';
import erson from '../assets/insignia.png';

export const avatarsList = [
    { name: 'Bullbasaur', src: bullbasaur },
    { name: 'Caterpie', src: caterpie },
    { name: 'Ditto', src: ditto },
    { name: 'Eball', src: eball },
    { name: 'Egg Incubator', src: eggIncubator },
    { name: 'Gunger', src: gunger },
    { name: 'Mankey', src: mankey },
    { name: 'Meowth', src: meowth },
    { name: 'Pikachu', src: pikachu },
    { name: 'Pokemon Go', src: pokemonGo },
    { name: 'Psyduck', src: psyduck },
    { name: 'Seal', src: seal },
    { name: 'Snorlax', src: snorlax },
    { name: 'Superball', src: superball },
    { name: 'Ultra Ball', src: ultraBall },
    { name: 'Zubat', src: zubat }
];

export const FullAvatarsList = [
    { name: 'Bullbasaur', src: bullbasaur },
    { name: 'Caterpie', src: caterpie },
    { name: 'Ditto', src: ditto },
    { name: 'Eball', src: eball },
    { name: 'Egg Incubator', src: eggIncubator },
    { name: 'Gunger', src: gunger },
    { name: 'Mankey', src: mankey },
    { name: 'Meowth', src: meowth },
    { name: 'Pikachu', src: pikachu },
    { name: 'Pokemon Go', src: pokemonGo },
    { name: 'Psyduck', src: psyduck },
    { name: 'Seal', src: seal },
    { name: 'Snorlax', src: snorlax },
    { name: 'Superball', src: superball },
    { name: 'Ultra Ball', src: ultraBall },
    { name: 'Zubat', src: zubat },
    { name: 'ethan', src: ethan },
    { name: 'erson', src: erson }
];

export const getAvatarSrc = (avatarName, avatarsList) => {
    const avatarSrc = avatarsList.find(obj => obj.name === avatarName).src;
    return avatarSrc;
};
import defaultIcon from './default'
import {loadImage, prepareIcon} from "../mapUtil.js";
import {map} from "../MapView.jsx";
import {mapIcons, mapImages} from "../preloadImages";
import backgroundSvg from "../../../resources/images/background.svg";


export const icons = {
    default: defaultIcon
}

function getSVG(iconPath) {
    return `
        <svg preserveaspectratio="none" height="50" width="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">            
            ${iconPath}
        </svg>
    `
}

const background = await loadImage(backgroundSvg)

export default async (e, mapPalette) => {
    if (!/^[a-z]+-[a-z]+-[0-9.]+$/.test(e.id)) {
        return;
    }
    if (map.hasImage(e.id)) {
        return;
    }
    const [category, color, rotation] = e.id.split('-')

    let image
    if (icons[category]) {
        const iconPath = icons[category](rotation, color, mapPalette);
        const svg = getSVG(iconPath)
        const svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
        image = await loadImage(URL.createObjectURL(svgBlob)).then(icon =>
            prepareIcon(icon))
    } else {
        image = await loadImage(mapIcons[category]).then(icon =>
            prepareIcon(background, icon, mapPalette[color].main))
    }

    if (!map.hasImage(e.id)) {
        map.addImage(e.id, image, {
            pixelRatio: window.devicePixelRatio,
        })
    }
}

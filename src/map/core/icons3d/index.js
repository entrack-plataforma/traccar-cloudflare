import car from './default'
import truck from './truck'
import {loadImage, prepareIcon} from "../mapUtil.js";
import {map} from "../MapView.jsx";
import {mapIcons} from "../preloadImages";
import backgroundSvg from "../../../resources/images/background.svg";
const baseUrl = import.meta.env.VITE_APP_3DICONS_BASEURL

export const icons = {
    default: car,
    car,
    truck
}

export const iconsRemote = {
    tractor: 'tractor_v2'
}

export function getSVG(iconPath, height=50, width=50, viewBox="0 0 50 50") {
    return `
        <svg preserveaspectratio="none" height="${height}" width="${width}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">            
            ${iconPath}
        </svg>
    `
}

const background = loadImage(backgroundSvg)

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
        const svg = icons[category](rotation, color, mapPalette);
        const svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
        image = await loadImage(URL.createObjectURL(svgBlob)).then(icon =>
            prepareIcon(icon))
    } else if (iconsRemote[category]) {
        image = await loadImage(`${baseUrl}/${iconsRemote[category]}.php?grados=${rotation}&c=${mapPalette[color].main.replace('#','')}`)
            .then(icon => prepareIcon(icon))
    } else {
        image = prepareIcon(await background, await loadImage(mapIcons[category]), mapPalette[color].main)
    }

    if (!map.hasImage(e.id)) {
        map.addImage(e.id, image, {
            pixelRatio: window.devicePixelRatio,
        })
    }
}

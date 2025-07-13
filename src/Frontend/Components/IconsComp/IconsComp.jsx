import * as MuiIcons from '@mui/icons-material'

export default function IconsComp({ iconName }) {
    const IconComponent = MuiIcons[iconName];
    if (!IconComponent) {
        return null
    } else {
        return <IconComponent></IconComponent>
    }
}

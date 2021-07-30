const size = {
    xs: "575px",
    sm: "767px",
    md: "991px",
    lg: "1199px",
    xl: "1399px",
    xxl: "1400px"
}

const Theme = {
    breakpoints: {
        xs: `only screen and (max-width: ${size.xs})`,
        sm: `only screen and (max-width: ${size.sm})`,
        md: `only screen and (max-width: ${size.md})`,
        lg: `only screen and (max-width: ${size.lg})`,
        xl: `only screen and (max-width: ${size.xl})`,
        xxl: `only screen and (min-width: ${size.xxl})`,
    }
} 

export default Theme
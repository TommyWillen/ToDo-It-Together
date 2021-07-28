const size = {
    xs: "575px",
    sm: "767px",
    md: "991px",
    lg: "1199px",
    xl: "1399px",
    xxl: "1400px"
}

const breakpoints = {
    xs: `(max-width: ${size.xs})`,
    sm: `(max-width: ${size.sm})`,
    md: `(max-width: ${size.md})`,
    lg: `(max-width: ${size.lg})`,
    xl: `(max-width: ${size.xl})`,
    xxl: `(min-width: ${size.xxl})`,
}

export default breakpoints;
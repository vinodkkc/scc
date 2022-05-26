const footerHeight = "2rem";
const useStyles = (theme) => ({
  footer: {
    padding: "1rem",
    background: theme.palette.footer.main,
    color: theme.palette.secondary.light,
    position: "fixed",
    bottom: 0,
    left: 0,
    height: footerHeight,
    width: "100%",
    zIndex: 9900,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  footeraTag: {
    color: theme.palette.secondary.light,
  },
});
export { useStyles };
export { footerHeight };

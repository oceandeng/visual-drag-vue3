const components = ["Picture", "VButton", "VText", "RectShape"];

export default components.map((key) => {
    return {
        key,
        component: require(`@/custom-components/${key}`).default,
    };
});

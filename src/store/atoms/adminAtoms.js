import { atom } from "recoil"




export const loginCredentialsAtom = atom({
    key: "loginCredentialsAtom",
    default: {
        email: "",
        Password: ""
    }
})


export const createProductAtom = atom({
    key: "createProductAtom",
    default: {
        name: "",
        description: "",
        category_id:"",
        discount_percent: "",
        availability: "",
        SKU: "",
        brand: "Triumph Lights",
        material: "",
        shape: "",
        design_style: "",
        fixture_form: "",
        ideal_for: "",
        power_source: "",
        installation: "",
        shade_material: "",
        voltage: "",
        light_color: "",
        light_source: "",
        light_color_temperature: "",
        included_components: "",
        lighting_method: "",
        item_weight: "",
        height: "",
        length: "",
        width: "",
        quantity: "",
        power_rating: "",
        brightness: "",
        controller_type: "",
        switch_type: "",
        switch_mounting: "",
        mounting_type: "",
        fixture_type: "",
        assembly_required: "",
        primary_material: "",
        number_of_light_sources: "",
        surge_protection: "",
        shade_color: "",
        key_features: "",
        batteries: "",
        embellishment: "",
        colors: [],
        watts:[]
    }
})




export const createdProductIdAtom = atom({
    key: "createdProductIdAtom",
    default: ""
})

export const categoriesAtom = atom({
    key: "categoriesAtom",
    default: []
})

export const colorsAtom = atom({
    key: "colorsAtom",
    default: []
})

export const updateCategoryAtom = atom({
    key: "updateCategoryAtom",
    default: ""
})

export const newWattFieldsAtom = atom({
    key: "newWattFieldsAtom",
    default: []
})
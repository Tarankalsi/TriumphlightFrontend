import React from 'react'
import ClosableDiv from './ClosableDiv'
import Row from './Row'

export default function MoreInfo({ product }) {


    const productInfoMapping = {
        "Basic Information": [
            { label: "Material", key: "material" },
            { label: "Shape", key: "shape" },
            { label: "Design Style", key: "design_style" },
            { label: "Light Source", key: "light_source" },
            { label: "Ideal For", key: "ideal_for" },
        ],
        "Product Information": [
            { label: "Voltage", key: "voltage" },
            { label: "Fixture Form", key: "fixture_form" },
            { label: "Light Color", key: "light_color" },
            { label: "Included Components", key: "included_components" },
            { label: "Lighting Method", key: "lighting_method" },
            { label: "Power Source", key: "power_source" },
            { label: "Installation", key: "installation" },
            { label: "Shade Material", key: "shade_material" },
        ],
        "Physical Dimensions": [
            { label: "Height", key: "height" },
            { label: "Length", key: "length" },
            { label: "Width", key: "width" },
            { label: "Item Weight", key: "item_weight" },
        ],
        "Additional Information": [
            { label: "Power Rating", key: "power_rating" },
            { label: "Controller Type", key: "controller_type" },
            { label: "Switch Type", key: "switch_type" },
            { label: "Switch Mounting", key: "switch_mounting" },
            { label: "Mounting Type", key: "mounting_type" },
            { label: "Fixture Type", key: "fixture_type" },
            { label: "Assembly Required", key: "assembly_required" },
            { label: "Primary Material", key: "primary_material" },
            { label: "Number of Light Sources", key: "number_of_light_sources" },
            { label: "Surge Protection", key: "surge_protection" },
            { label: "Shade Color", key: "shade_color" },
            { label: "Key Features", key: "key_features" },
            { label: "Batteries", key: "batteries" },
            { label: "Embellishment", key: "embellishment" },
        ]
    };

    return (
        <div>
            <ClosableDiv key="description" label="Description">
                <p className='mx-4 my-2 mb-5 text-sm tracking-wide'>{product.description || 'No description available'}</p>
            </ClosableDiv>

            {Object.keys(productInfoMapping).map((category) => (
                <ClosableDiv key={category} label={category}>

                    {productInfoMapping[category].map((item) => {

                        const value = product[item.key.trim()];


                        return (
                            product[item.key] && <Row key={item.key} heading={item.label} data={value} />
                        );
                    })}

                </ClosableDiv>
            ))}
        </div>
    )
}

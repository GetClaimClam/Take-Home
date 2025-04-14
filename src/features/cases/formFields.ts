export interface FormFieldConfig {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    colSpan: number;
}

export interface FormSectionConfig {
    sectionId: string;
    fields: FormFieldConfig[];
}

export interface RadioOptionConfig {
    id: string;
    label: string;
    value: string;
}

export const personalInfoFields: FormSectionConfig[] = [
    {
        sectionId: "names",
        fields: [
            {
                id: "firstName",
                label: "First Name",
                type: "text",
                placeholder: "John",
                required: true,
                colSpan: 4,
            },
            {
                id: "middleInitial",
                label: "Middle Initial",
                type: "text",
                placeholder: "D",
                required: false,
                colSpan: 3,
            },
            {
                id: "lastName",
                label: "Last Name",
                type: "text",
                placeholder: "Doe",
                required: true,
                colSpan: 5,
            },
        ],
    },
    {
        sectionId: "address",
        fields: [
            {
                id: "address",
                label: "Address",
                type: "text",
                placeholder: "1234 Elm Street",
                required: true,
                colSpan: 8,
            },
            {
                id: "aptSuite",
                label: "Apt/Suite",
                type: "text",
                placeholder: "5B",
                required: false,
                colSpan: 4,
            },
        ],
    },
    {
        sectionId: "location",
        fields: [
            {
                id: "city",
                label: "City",
                type: "text",
                placeholder: "Los Angeles",
                required: true,
                colSpan: 5,
            },
            {
                id: "state",
                label: "State",
                type: "text",
                placeholder: "CA",
                required: true,
                colSpan: 3,
            },
            {
                id: "zipCode",
                label: "ZIP Code",
                type: "text",
                placeholder: "90001",
                required: true,
                colSpan: 4,
            },
        ],
    },
    {
        sectionId: "contact",
        fields: [
            {
                id: "phoneNumber",
                label: "Phone Number",
                type: "tel",
                placeholder: "(310) 555-7890",
                required: true,
                colSpan: 6,
            },
            {
                id: "emailAddress",
                label: "Email Address",
                type: "email",
                placeholder: "johndoe@example.com",
                required: true,
                colSpan: 6,
            },
        ],
    },
];

export const productInfoFields: FormSectionConfig[] = [
    {
        sectionId: "productDetails",
        fields: [
            {
                id: "productName",
                label: "Name of Product Purchased",
                type: "text",
                placeholder: "Robitussin Maximum Strength Cough",
                required: true,
                colSpan: 12,
            },
        ],
    },
    {
        sectionId: "purchaseDetails",
        fields: [
            {
                id: "purchaseDate",
                label: "Approximate Date of Purchase",
                type: "date",
                placeholder: "08/2023",
                required: true,
                colSpan: 6,
            },
            {
                id: "quantity",
                label: "Quantity",
                type: "number",
                placeholder: "2",
                required: true,
                colSpan: 6,
            },
        ],
    },
    {
        sectionId: "retailerDetails",
        fields: [
            {
                id: "retailerName",
                label: "Name of Retailer/Store where Covered Product was Purchased",
                type: "text",
                placeholder: "Walgreens",
                required: true,
                colSpan: 12,
            },
        ],
    },
    {
        sectionId: "purchaseLocation",
        fields: [
            {
                id: "purchaseLocation",
                label: "City/State where Covered Product was Purchased",
                type: "text",
                placeholder: "Chicago",
                required: true,
                colSpan: 12,
            },
        ],
    },
];

export const paymentMethodOptions: RadioOptionConfig[] = [
    {
        id: "amazon",
        label: "Amazon",
        value: "amazon",
    },
    {
        id: "physical-check",
        label: "Physical Check",
        value: "physical-check",
    },
    {
        id: "zelle",
        label: "Zelle",
        value: "zelle",
    },
    {
        id: "venmo",
        label: "Venmo",
        value: "venmo",
    },
    {
        id: "ach",
        label: "ACH",
        value: "ach",
    },
    {
        id: "virtual-mastercard",
        label: "Virtual Mastercard",
        value: "virtual-mastercard",
    },
];

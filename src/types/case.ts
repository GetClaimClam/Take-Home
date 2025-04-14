export interface Case {
    id: number;
    is_premium: boolean;
    proof_needed: boolean;
    name: string;
    description: string;
    close_date: string;
    payout_amount: number;
    title?: string;
    link_to_survey: string;
    date_to_close?: string;
    retainer?: {
        link_to_retainer: string;
    };
    counsels?: string[];
    additional_docs?: string[];
    // amount_to_be_recovered?: AmountToBeRecovered;
    // provider?: Provider;
}

export interface CaseWithDateObject extends Omit<Case, "close_date"> {
    close_date: Date;
}

export interface AmountToBeRecovered {
    raw: string;
    max_amount: number;
    description: string;
}

export interface Provider {
    name: string;
    url: string;
}

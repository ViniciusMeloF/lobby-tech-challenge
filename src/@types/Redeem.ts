export type IRedeemStep =
  | "WELCOME"
  | "GIFT-CHOICE"
  | "USER-FORM"
  | "CONFIRMATION";

export interface IRedeem {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  title: string;
  welcome_title: string;
  welcome_phrase: string;
  logo_url: string;
  background_color: string;
  button_color: string;
  items: IItem[] | [];
  extra_questions: IExtraQuestion[];
}

export interface IExtraQuestion {
  id: number;
  answer_type: string;
  question: string;
  position: number;
  options: string[];
}

export interface IItem {
  customer_product_id: string;
  name: string;
  quantity: number;
  optional: boolean;
  image_url: string;
  sizes_grid: ISizesGrid | null;
  sizes: ISize[] | [];
}

export interface ISize {
  id: string;
  name: string;
}

export interface ISizesGrid {
  name: string;
}

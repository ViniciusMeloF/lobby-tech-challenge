import { BrowserRouter, Routes as ReactRouter, Route } from "react-router";

import { RedeemProvider } from "./contexts/RedeemContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Redeem } from "./pages/Redeem";

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRouter>
        <Route path="/" element={<Home />} />
        <Route
          path="/redeem/:id"
          element={
            <RedeemProvider>
              <Redeem />
            </RedeemProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </ReactRouter>
    </BrowserRouter>
  );
};

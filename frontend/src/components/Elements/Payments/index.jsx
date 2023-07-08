import Paypall from "../../../assets/img/braintree_paypal.svg";
import Checkout from "../../../assets/img/checkout.svg";
import Ovo from "../../../assets/img/dlocal_ovo_wallet.svg";
import Dana from "../../../assets/img/dlocal_dana_wallet.svg";
import LinkAja from "../../../assets/img/dlocal_link_aja_wallet.svg";
import QRIS from "../../../assets/img/dlocal_qris_wallet.svg";
import Bank from "../../../assets/img/dlocal_bank_transfer.svg";
import Flip from "../../../assets/img/dlocal_flip.svg";

const Payments = () => {
  const dataPayments = [
    { image: Paypall },
    { image: Checkout },
    { image: Ovo },
    { image: Dana },
    { image: LinkAja },
    { image: QRIS },
    { image: Flip },
    { image: Bank },
  ];
  return (
    <>
      <div className="payment-list flex flex-wrap items-center justify-center py-3">
        {dataPayments.map((payment, index) => {
          return <img key={index} className="w-10 mx-2" src={payment.image} alt="" />;
        })}
      </div>
    </>
  );
};

export default Payments;

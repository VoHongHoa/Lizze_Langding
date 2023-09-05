import React from "react";
import "./FooterCommon.scss";
const FooterCommon = () => {
  return (
    <footer>
      <div className="footer-gray">
        <div className="footer-custom">
          <div className="footer-lists">
            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">Lizzie</h6>
              <ul className="ftr-links-sub">
                <li>800-952-5592</li>
              </ul>
            </div>

            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">Chăm sóc khách hàng</h6>
              <ul className="ftr-links-sub">
                <li>
                  <a href="/help/talktous.html" rel="nofollow">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="/help/placingorders.html" rel="nofollow">
                    Đặt hàng
                  </a>
                </li>
                <li>
                  <a href="/help/shipping.html" rel="nofollow">
                    Vận chuyển
                  </a>
                </li>
                <li>
                  <a href="/help/shippingreturns.html" rel="nofollow">
                    Chính sách đổi trả
                  </a>
                </li>

                <li>
                  <a href="/~/egift-cards/" rel="nofollow">
                    Mã quà tặng
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">Về chúng tôi</h6>
              <ul className="ftr-links-sub">
                <li>
                  <a
                    href="/asp/aboutus/default-asp/_/posters.htm"
                    rel="nofollow"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="http://corporate.art.com/careers" rel="nofollow">
                    Tuyển dụng
                  </a>
                </li>

                <li>
                  <a href="/catalog" rel="nofollow">
                    <strong>Danh mục sản phẩm</strong>
                  </a>
                </li>
                <li>
                  <a href="http://blog.art.com" rel="nofollow">
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">My Account</h6>
              <ul className="ftr-links-sub">
                <li className="ftr-Login">
                  <span className="link login-trigger">Access My Account</span>
                </li>
                <li>
                  <span className="link">Track My Order</span>
                </li>

                <li className="ftr-Login">
                  <span className="link ftr-access-my-account">
                    Access My Account
                  </span>
                </li>
                <li>
                  <span className="link">Track My Order</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-email">
            <h6 className="ftr-hdr">
              Sign up for exclusive offers and inspiration
            </h6>
            <div id="ftr-email" className="ftr-email-form">
              <div className="error">Please enter a valid email address</div>
              <input
                type="text"
                name="email_address_"
                id="ftrEmailInput"
                className="input"
                placeholder="Enter email address"
              />
              <input type="submit" className="button" value="SUBMIT" />
              <input type="hidden" name="country_iso2" value="" />
              <input type="hidden" name="language_iso2" value="en" />
              <input type="hidden" name="site_domain" value="art.com" />
              <input type="hidden" name="email_acq_source" value="01-000001" />
              <input
                type="hidden"
                name="email_acq_date"
                value=""
                id="ftr-email-date"
              />
              <input type="hidden" name="brand_id" value="ART" />
            </div>

            <div className="ftr-email-privacy-policy"></div>
          </div>

          <div className="footer-social">
            <h6 className="ftr-hdr">Follow Us</h6>
            <ul>
              <li>
                <a href="https://www.facebook.com/art.com" title="Facebook">
                  <img
                    width="24"
                    height="24"
                    alt="Like us on Facebook"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/fb.png"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://plus.google.com/108089796661280870153"
                  title="Google+"
                >
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Google+"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/gplus.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://pinterest.com/artdotcom/" target="_blank">
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Pinterest"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/pin-badge.png"
                  />
                </a>
              </li>
              <li>
                <a target="_blank" href="http://instagram.com/artdotcom/">
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Instagram"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/instagram-badge.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/artdotcom" title="Twitter">
                  <img
                    width="67"
                    alt="Follow us on Twitter"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/twitter.png"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-legal">
            <p>
              &copy; Art.com Inc. All Rights Reserved. |{" "}
              <a href="/help/privacy-policy.html" rel="nofollow">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/help/terms-of-use.html" rel="nofollow">
                Terms of Use
              </a>{" "}
              |{" "}
              <a href="/help/terms-of-sale.html" rel="nofollow">
                Terms of Sale
              </a>
            </p>
            <p>
              Art.com, You+Art, and Photos [to] Art are trademarks or registered
              trademarks of Art.com Inc.
            </p>
            <p>
              Various aspects of this website are covered by issued US patent
              No. 7,973,796 and other pending patent applications.
            </p>
          </div>

          <div className="footer-payment">
            <ul>
              <li className="ftr-stella">
                <span title="Stella Service"></span>
              </li>
              <li>
                <span>
                  <img
                    border="0"
                    alt="HACKER SAFE certified sites prevent over 99.9% of hacker crime."
                    src="https://images.scanalert.com/meter/www.art.com/31.gif"
                  />
                </span>
              </li>
              <li className="ftr-bbb">
                <span title="BBB"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCommon;

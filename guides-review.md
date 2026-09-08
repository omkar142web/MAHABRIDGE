## 1. Factual Corrections & Official URLs

* **`pan-card`**
* **Field:** `authority.website`
* **Old Value:** `[https://www.incometaxindia.gov.in](https://www.incometaxindia.gov.in)`
* **Suggested Value:** `[https://www.incometax.gov.in](https://www.incometax.gov.in)`
* **Reason:** `incometaxindia.gov.in` is primarily an information archive. PAN applications and e-PAN services are handled via the e-filing portal or authorized infrastructure (Protean/UTIITSL).


* **`voter-id`**
* **Field:** `authority.website`
* **Old Value:** `[https://www.eci.gov.in](https://www.eci.gov.in)`
* **Suggested Value:** `[https://voters.eci.gov.in](https://voters.eci.gov.in)`
* **Reason:** Citizens register, correct details, and track EPIC on the dedicated Voters Service Portal rather than the main ECI informational site.


* **`birth-certificate`**
* **Field:** `authority.website`
* **Old Value:** `null`
* **Suggested Value:** `[https://crsorgi.gov.in](https://crsorgi.gov.in)`
* **Reason:** Although issued locally by municipal bodies, the Civil Registration System (CRS) is the official central portal providing national registration guidance and links.


* **`atm-card`**
* **Field:** `requirements[0].state` (PAN Card requirement)
* **Old Value:** `required`
* **Suggested Value:** `conditional`
* **Reason:** A PAN card is not universally mandatory for all basic bank accounts or ATM cards (e.g., minor accounts or basic savings bank deposit accounts where Form 60 can be submitted).



---

## 2. Missing Aliases, Keywords, & Goal Phrases

* **`aadhaar`**
* **Add Aliases/Keywords:** `"mAadhaar"`, `"virtual id"`, `"vid"`, `"biometric update"`


* **`driving-licence`**
* **Add Aliases:** `"dl renewal"`, `"permanent dl"`, `"learning licence slot"`


* **`income-certificate`**
* **Add Goal Phrases:** `"how to prove my annual income"`, `"income certificate for college fees"`



---

## 3. Plain-Language Improvements

* **State Certificates (`income-certificate`, `caste-certificate`, `domicile-certificate`, `ration-card`)**
* **Field:** `obtain.how` / `summary`
* **Current Issue:** Generic text mentions "state's revenue / e-district portal" without clear contextual framing.
* **Suggested Improvement:** Since MAHA-BRIDGE strongly points toward Maharashtra-context user assistance, explicitly reference state-specific portals like **Aaple Sarkar** (`aaplesarkar.mahaonline.gov.in`) or regional equivalents to prevent citizen confusion when searching for local Tehsil or MahaESeva Kendra touchpoints.



---

## 4. Structural Problems & Inconsistent States

* **`scholarship-general`**
* **Field:** `requirements[3].state` ("Domicile or residence proof")
* **Old Value:** `"uncertain"`
* **Suggested Value:** `"conditional"` or `"optional"`
* **Reason:** The state value `"uncertain"` breaks standard UI validation and conditional rendering schemas that rely strictly on predictable states like `"required"`, `"optional"`, or `"conditional"`.

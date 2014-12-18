<?php
//JSONP data request from remote server

error_reporting(E_ALL | E_PARSE);

header('content-type: application/json; charset=utf-8');

$data = '[
 {
"category"   :"metadata",
"docTitle"   :"Current Issue",
"docName"    :"Ophthalmology Management",
"issueDate"  :"201722",
"issueMonth" :"November",
"issueYear"  :"2014",
"displayDate":"November, 2014",
"isLatest"   :true
 },
 {
"articleID"   :"20141104",
"category"   :"Feature",
"title"   :"DME drugs multiply",
"author"   :"By Veeral S. Sheth, MD, MBA, FACS and Seenu M. Hariprasad, MD",
"subTitle"   :"Two new steroid implants offer two-pronged attack, durability.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A04.html"
 },
 {
"articleID"   :"20141105",
"category"   :"Feature",
"title"   :"Diabetes, the eye, and the treatment of both",
"author"   :"By Erik Florida, Contributing Editor",
"subTitle"   :"Diabetic eye disease creates a major challenge in the development of vision-sustaining drugs.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A05.html"
 },
 {
"articleID"   :"20141106",
"category"   :"Feature",
"title"   :"Which DME patients are right for surgery?",
"author"   :"By Apurva Patel, MD",
"subTitle"   :"Despite an expanding formulary to treat diabetic macular edema, some patients\' singular situations call for a surgical approach.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A06.html"
 },
 {
"articleID"   :"20141107",
"category"   :"Feature",
"title"   :"A photographer\'s perspective on DME imaging",
"author"   :"By Bill Kekevian, Senior Associate Editor",
"subTitle"   :"While some practices rely solely on OCT, others continue to depend on fluorescein angiography.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A07.html"
 },
 {
"articleID"   :"20141108",
"category"   :"Feature",
"title"   :"Telemedicine brings teamwork to battling DR",
"author"   :"By Seema Garg, MD, PhD",
"subTitle"   :"The new paradigm forgses a logical partnership between ophthalmology and primary care.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A08.html"
 },
 {
"articleID"   :"20141109",
"category"   :"Feature",
"title"   :"Conjunctival tumor watch",
"author"   :"By Carol Shields, MD",
"subTitle"   :"The appearance of these tumors can be deceptively harmless; some simulate other conditions. Most are benign, but even those require scrutiny.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A09.html"
 },
 {
"articleID"   :"20141110",
"category"   :"Feature",
"title"   :"Maybe downsizing is not the answer",
"author"   :"By Zack Tertel, Senior Associate Editor",
"subTitle"   :"Industry experts say to thoroughly evaluate and consider all alternatives before scaling back your practice.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A10.html"
 },
 {
"articleID"   :"20141111",
"category"   :"Feature",
"title"   :"Interested in closing the &#8216;treatment loop\'?",
"author"   :"By Stuart Michaelson, Contributing Editor",
"subTitle"   :"Merely having a dispensary isn\'t enough &#8212; first you need to appreciate business terms such as &#8216;capture rate.\'",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A11.html"
 },
 {
"articleID"   :"20141112",
"category"   :"Feature",
"title"   :"Return on experience &#8211; place a value on ROE",
"author"   :"By Vance Thompson, MD, John Berdahl, MD, Alison Tendler, MD",
"subTitle"   :"While it\'s not the primary goal, a quality patient experience can lead to a positive ROI.",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A12.html"
 },
 {
"articleID"   :"20141101",
"category"   :"Department",
"title"   :"Viewpoint",
"author"   :"Larry E. Patterson, MD",
"subTitle"   :"Our Policy: The Door Is Open",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A01.html"
 },
 {
"articleID"   :"20141102",
"category"   :"Department",
"title"   :"Quick Hits",
"author"   :"By Ren&#233; Luthe, Senior Editor",
"subTitle"   :"",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A02.html"
 },
 {
"articleID"   :"20141103",
"category"   :"Department",
"title"   :"CODING &amp; REIMBURSEMENT",
"author"   :"By Suzanne Corcoran",
"subTitle"   :"Getting H&amp;P right",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A03.html"
 },
 {
"articleID"   :"20141113",
"category"   :"Department",
"title"   :"Best Practices",
"author"   :"By Maureen Waddle",
"subTitle"   :"Take me to your leader &#8230; if you have one",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A13.html"
 },
 {
"articleID"   :"20141114",
"category"   :"Department",
"title"   :"THE EFFICIENT OPHTHALMOLOGIST",
"author"   :"By Steven M. Silverstein, MD, FACS",
"subTitle"   :"No shortcuts to success",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A14.html"
 },
 {
"articleID"   :"20141115",
"category"   :"Department",
"title"   :"IT ADVISER",
"author"   :"By Joe Dysart",
"subTitle"   :"Facebook eliminates free-marketing ride",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A15.html"
 },
 {
"articleID"   :"20141116",
"category"   :"Department",
"title"   :"SPOTLIGHT ON TECHNOLOGY &amp; TECHNIQUE",
"author"   :"By Zack Tertel, Senior Associate Editor",
"subTitle"   :"PSF Integra offers a target system aimed at precision",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A16.html"
 },
 {
"articleID"   :"20141117",
"category"   :"Department",
"title"   :"NEW PRODUCT REPORT",
"author"   :"",
"subTitle"   :"",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A17.html"
 },
 {
"articleID"   :"20141118",
"category"   :"Department",
"title"   :"THE ENLIGHTENED OFFICE",
"author"   :"By Cynthia Matossian, MD, FACS",
"subTitle"   :"Patient surveys give us insights into our patients\' minds",
"isDownloaded"   :false,
"fileName"   :"OMD_November_A18.html"
 }
 ]';

echo $_GET['callback'] . '('.json_encode($data).')';

?>
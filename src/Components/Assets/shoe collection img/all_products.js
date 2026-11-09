import p1imga from "./11304.jpg.webp";
import p1imgb from "./11305.jpg.webp";
import p1imgc from "./11306.jpg.webp";

import p2imga from "./Handmade-Γυναικείο-Μποτάκι-Gabriela-Valeri-με-Τοκάδες-600-1b.jpg";
import p2imgb from "./Handmade-Γυναικείο-Μποτάκι-Gabriela-Valeri-με-Τοκάδες-600-2c.jpg";
import p2imgc from "./Handmade-Γυναικείο-Μποτάκι-Gabriela-Valeri-με-Τοκάδες-600a.jpg";

import p3imga from "./TZS_7996a.jpg";
import p3imgb from "./TZS_7997b.jpg";
import p3imgc from "./TZS_7998c.jpg";

import p4imga from "./157666515674197496-19b.jpg";
import p4imgb from "./157666515674197496-1-15c.jpg";
import p4imgc from "./157666515674197496-2-9a.jpg";

import p5imga from "./11293a.jpg";
import p5imgb from "./11294b.jpg";
import p5imgc from "./11296c.jpg";

import p6imga from "./5566a.jpg";
import p6imgb from "./5567b.jpg";
import p6imgc from "./5568c.jpg";

import p8imga from "./Gabriela-Valeri-Χειροποίητα-Μοντέρνα-Μποτάκια-INF-1b.jpg";
import p8imgb from "./Gabriela-Valeri-Χειροποίητα-Μοντέρνα-Μποτάκια-INF-2c.jpg";
import p8imgc from "./Gabriela-Valeri-Χειροποίητα-Μοντέρνα-Μποτάκια-INFa.jpg";

import img9a from "./Handmade-Μποτάκι-Gabriela-Valeri-με-Σχέδιο-Καπιτονέ-600-1b.jpg";
import img9b from "./Handmade-Μποτάκι-Gabriela-Valeri-με-Σχέδιο-Καπιτονέ-600-2c.jpg";
import img9c from "./Handmade-Μποτάκι-Gabriela-Valeri-με-Σχέδιο-Καπιτονέ-600a.jpg";
import checkoutCatalog from '../../../data/checkout-catalog.json';

const productImages = [
    {
      id: 1001,
      name: "Γόβα με άσπρες λεπτομέρειες ~1001~",
      price: "50€",
      imageUrl1: p1imga,
      imageUrl2: p1imgb,
      imageUrl3: p1imgc,
      description: "Μια μοναδική επιλογή για κομψές εμφανίσεις, αυτή η γόβα συνδυάζει την απλότητα με τις εκλεπτυσμένες λεπτομέρειες. Οι άσπρες πινελιές προσθέτουν έναν αέρα μοντέρνας κομψότητας, ενώ η κατασκευή από υψηλής ποιότητας υλικά εγγυάται άνεση και αντοχή. Ιδανική για βραδινές εξόδους ή ειδικές περιστάσεις",
      category: ["Γόβες", "Γυναικεία"], // More than one category
    },
    {
      id: 1101,
      name: "Gabriela Valeri Handmade Γυναικείο Μποτάκι με Τοκάδες ~1101~",
      price: "55€",
      imageUrl1: p2imga,
      imageUrl2: p2imgb,
      imageUrl3: p2imgc,
      description: "Αυτά τα χειροποίητα μποτάκια από τη Gabriela Valeri είναι ο απόλυτος συνδυασμός στυλ και πρακτικότητας. Οι διακριτικοί τοκάδες προσθέτουν ένα δυναμικό χαρακτήρα στο σχέδιο, ενώ η άνετη εφαρμογή τους τα καθιστά ιδανικά για καθημερινή χρήση. Μια διαχρονική επιλογή που ταιριάζει τόσο με casual όσο και με πιο formal εμφανίσεις.",
      category: ["Μποτάκια", "Γυναικεία"], // More than one category
    },
    {
      id: 1002,
      name: "Gabriela Valeri Handmade Γόβα Με Μαύρο Glitter και Μαύρη Διαφάνεια ~1002~",
      price: "70€",
      imageUrl1: p3imga,
      imageUrl2: p3imgb,
      imageUrl3: p3imgc,
      description: "Για τις γυναίκες που αγαπούν τη λάμψη, αυτή η γόβα είναι η ιδανική επιλογή. Ο συνδυασμός μαύρου glitter και κομψής διαφάνειας δημιουργεί ένα αποτέλεσμα που κλέβει την παράσταση. Τέλεια για επίσημες εκδηλώσεις ή βραδινές εξόδους που απαιτούν μια πινελιά πολυτέλειας.",
      category: ["Γόβες", "Γυναικεία"], // More than one category
    },
    {
      id: 1003,
      name: "Gabriela Valeri Handmade Γόβα με ιδιαίτερο Φιόγκο ~1003~",
      price: "80€",
      imageUrl1: p4imga,
      imageUrl2: p4imgb,
      imageUrl3: p4imgc,
      description: "Αυτή η χειροποίητη γόβα ξεχωρίζει για τον μοναδικό της φιόγκο που προσδίδει μια ρομαντική νότα στο σχέδιο. Με εξαιρετική εφαρμογή και διαχρονικό design, είναι ιδανική για γυναίκες που θέλουν να ξεχωρίσουν με τις επιλογές τους. Φοριέται εύκολα σε γάμους, δεξιώσεις και άλλες ξεχωριστές περιστάσεις.",
      category: ["Γόβες", "Γυναικεία"], // More than one category
    },
    {   
        id: 1023,
        name: "Gabriela Valeri Χρυσή Γόβα με Κόσμημα ~1023~", 
        category: ["Γόβες" ,"Γυναικεία"], 
        price: "90€", 
        imageUrl1: p5imga, 
        imageUrl2: p5imgb, 
        imageUrl3: p5imgc, 
        description: "Ένα κόσμημα στα πόδια σας! Αυτή η χρυσή γόβα με το εντυπωσιακό διακοσμητικό στοιχείο προσφέρει μοναδική λάμψη και κομψότητα. Ιδανική επιλογή για επίσημες περιστάσεις, όπου θέλετε να εντυπωσιάσετε με το στυλ σας. Εξαιρετική εφαρμογή και premium ποιότητα για άνεση όλη τη νύχτα."

    },
    {
      id: 1601,
      name: "Loafers ~1601~",
      price: "65€",
      imageUrl1: p6imga,
      imageUrl2: p6imgb,
      imageUrl3: p6imgc,
      description: "Συνδυάστε την άνεση με το στυλ με αυτά τα loafers. Με κλασικό design που ταιριάζει απόλυτα σε casual αλλά και ημιεπίσημες περιστάσεις, αυτά τα παπούτσια είναι κατασκευασμένα από υλικά υψηλής ποιότητας που προσφέρουν στήριξη και διαχρονικότητα. Ιδανική επιλογή για καθημερινές δραστηριότητες.",
      category: ["Loafers", "Γυναικεία"], // More than one category
    },
    {
      id: 1401,
      name: "Γυναικεία Μαύρα Μποτάκια ~1401~",
      price: "65€",
      imageUrl1: p8imga,
      imageUrl2: p8imgb,
      imageUrl3: p8imgc,
      description: "Αυτά τα μαύρα μποτάκια αποτελούν must-have για κάθε γυναικεία γκαρνταρόμπα. Το διαχρονικό τους σχέδιο τα καθιστά ιδανική επιλογή για κάθε εποχή, ενώ η άνετη εφαρμογή και η premium ποιότητα εξασφαλίζουν τη μέγιστη αντοχή. Φορέστε τα με παντελόνια, φορέματα ή φούστες για κομψές και στιλάτες εμφανίσεις.",
      category: ["Μποτάκια", "Γυναικεία"], // More than one category
    },
    {
      id: 600,
      name: "Γυνακεία Μποτάκια Καπιτονέ ~600~",
      price: "75€",
      imageUrl1: img9a,
      imageUrl2: img9b,
      imageUrl3: img9c,
      description: "Μια κομψή επιλογή για τις κρύες μέρες του χειμώνα, αυτά τα καπιτονέ μποτάκια προσφέρουν άνεση και στυλ. Η πολυτελής τους υφή και το διαχρονικό τους design τα καθιστούν ιδανικά για καθημερινές εμφανίσεις, αλλά και για πιο ιδιαίτερες περιστάσεις. Συνδυάστε τα με casual ή chic looks για απόλυτη κομψότητα.",
      category: ["Μποτάκια", "Γυναικεία"], // More than one category
    },
  ];
  
const checkoutProducts = new Map(checkoutCatalog.map((product) => [product.id, product]));

const allProducts = productImages.map((product) => {
  const checkoutProduct = checkoutProducts.get(product.id);
  if (!checkoutProduct) {
    throw new Error(`Missing checkout price for product ${product.id}.`);
  }

  return {
    ...product,
    name: checkoutProduct.name,
    price: `${(checkoutProduct.unitAmount / 100).toFixed(2)}€`,
  };
});

export default allProducts;
  

export default function StructuredData() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Auto Per Tutti",
        "description": "Vendita auto nuove e usate, noleggio, officina e autolavaggio",
        "url": "https://www.autopertutti.net",
        "telephone": "+390815763372",
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "Via Circumflegrea",
            "addressLocality": "Pozzuoli",
            "postalCode": "80078",
            "addressCountry": "IT"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Via Nuova Agnano",
            "addressLocality": "Napoli",
            "addressCountry": "IT"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Via Carriona",
            "addressLocality": "Carrara",
            "postalCode": "54033",
            "addressCountry": "IT"
          }
        ],
        "areaServed": ["Napoli", "Agnano", "Carrara", "Campania"],
        "priceRange": "€€",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "340"
        }
      })}
    </script>
  );
}

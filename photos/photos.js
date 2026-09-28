// Gallery photos, shown in this order.
// To add a photo: put the file in photos/<category>/ and add a line below, e.g.
//   { src: "photos/animals/fox.jpg", alt: "A red fox in the snow", category: "animals", title: "Winter fox" },
// `alt` describes the image for screen readers; `title` (optional) is the lightbox caption.
// The Unsplash entries are placeholders — delete them once you've added your own.
const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

window.PHOTOS = [
  { src: unsplash("1674985594089-eab270e843c5"), alt: "A cat lying on a sidewalk next to the ocean", category: "animals" },
  { src: unsplash("1676978647680-0e60a584c5fa"), alt: "A snow covered mountain with trees on the side", category: "landscape" },
  { src: unsplash("1677075610184-57d21d023e5b"), alt: "A city street with tall buildings in the background", category: "street" },
  { src: unsplash("1510673825466-302bc330ab95"), alt: "Lanterns floating in the air at night", category: "portraits-events" },
  { src: unsplash("1675189729507-b90d7cb6c592"), alt: "A pheasant flying with its wings spread", category: "animals" },
  { src: unsplash("1675971074488-351394caf6aa"), alt: "A blue sky with red and orange clouds", category: "landscape" },
  { src: unsplash("1558102400-72da9fdbecae"), alt: "The 25 de Abril bridge spanning the Tagus river", category: "street" },
  { src: unsplash("1667093060577-02f07eb01585"), alt: "A man standing on a beach next to the ocean", category: "portraits-events" },
  { src: unsplash("1675620705848-bcab2d4d98a4"), alt: "A flock of seagulls flying over water", category: "animals" },
  { src: unsplash("1655908932015-7650b401e2f9"), alt: "A view of the ocean from the top of a hill", category: "landscape" },
  { src: unsplash("1551346072-8ba2706b0f36"), alt: "The Monument to the Discoveries seen from below", category: "street" },
  { src: unsplash("1675789203977-70070dae0799"), alt: "A person standing in front of a rock formation", category: "portraits-events" },
  { src: unsplash("1675910568522-c187fd74d5b9"), alt: "A branch floating in a body of water", category: "landscape" },
  { src: unsplash("1654018869756-d08407972836"), alt: "Two statues side by side", category: "street" },
  { src: unsplash("1642415390616-2ac6727ac550"), alt: "A statue of a headless angel", category: "street" },
];

// Everything personal about the site lives here. Edit this file, not the HTML.
window.SITE = {
  name: "Liya Wang",
  tagline: "Landscapes, animals, cities and people — moments worth a second look.",
  description:
    "Photography portfolio of Liya Wang: landscapes, animals, city photography, portraits and events.",
  location: "", // e.g. "Toronto, Canada" — leave empty to hide
  email: "", // e.g. "hello@liyawang.com" — leave empty to hide
  // Leave a link empty ("") to hide that icon.
  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
    behance: "",
  },
  about: {
    greeting: "Hello there, I'm Liya",
    portrait: "assets/avatar.jpg",
    // Short facts shown as a list under the greeting.
    highlights: [
      "MSc Interactive Media, University College Cork (UCC)",
      "8 years of photography experience",
      "Red panda lover",
    ],
    paragraphs: [
      "I'm a photographer drawn to the quiet details — an animal mid-glance, light moving across a landscape, a stranger's expression on a busy city street.",
      "Over the past 8 years I've photographed wildlife, landscapes, cities, portraits and events. My MSc in Interactive Media from UCC shapes how I think about images: not just what's in the frame, but how people experience it.",
      "You'll often find me at the red panda enclosure. If you'd like to work together or just want to talk photography, I'd love to hear from you.",
    ],
  },
  contactPhoto: "assets/contact.jpg",
  // Gallery filters. Keys must match the `category` values in photos/photos.js.
  categories: {
    landscape: "Landscape",
    animals: "Animals",
    city: "City",
    "portraits-events": "Portraits & Events",
  },
  // The default "Featured" view shows photos from these categories.
  featured: ["landscape", "animals", "city"],
};

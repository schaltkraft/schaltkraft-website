import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  // ==============================================
  // SINGLETONS
  // ==============================================
  singletons: {
    // HEADER NAVIGATION
    header: singleton({
      label: 'Header Navigation',
      path: 'content/global/header',
      format: { data: 'json' },
      schema: {
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/global',
          publicPath: '/images/global/',
        }),
        logoAlt: fields.text({ label: 'Logo Alt Text' }),
        navigationItems: fields.array(
          fields.object({
            label: fields.text({ label: 'Link-Text' }),
            url: fields.text({ label: 'URL' }),
            children: fields.array(
              fields.object({
                label: fields.text({ label: 'Sub-Link Label' }),
                url: fields.text({ label: 'Sub-Link URL' }),
                description: fields.text({ label: 'Kurzbeschreibung (für Mega Menu)' }),
              }),
              {
                label: 'Mega Menu Einträge (Dropdown)',
                itemLabel: (props) => props.fields.label.value || 'Sub-Link',
              }
            ),
          }),
          {
            label: 'Navigation Links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        ctaButton: fields.object({
          text: fields.text({ label: 'Button Text' }),
          url: fields.text({ label: 'Button URL' }),
        }),
      },
    }),

    // FOOTER
    footer: singleton({
      label: 'Footer',
      path: 'content/global/footer',
      format: { data: 'json' },
      schema: {
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/global',
          publicPath: '/images/global/',
        }),
        tagline: fields.text({ label: 'Tagline/Claim' }),
        quicklinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' })
          }),
          {
            label: 'Quick Links',
            itemLabel: (props) => props.fields.label.value || 'Link'
          }
        ),
        contactInfo: fields.object({
          companyName: fields.text({ label: 'Firmenname' }),
          address: fields.text({ label: 'Adresse', multiline: true }),
          email: fields.text({ label: 'E-Mail' }),
          phone: fields.text({ label: 'Telefon' }),
        }),
        copyright: fields.text({ label: 'Copyright', defaultValue: '©2025 All rights reserved, Schaltkraft AG' }),
      },
    }),

    // SEO DEFAULTS
    seoDefaults: singleton({
      label: 'SEO Standard',
      path: 'content/global/seo',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Website Titel' }),
        siteDescription: fields.text({ label: 'Website Beschreibung', multiline: true }),
        ogImage: fields.image({
          label: 'OG Image',
          directory: 'public/images/global',
          publicPath: '/images/global/',
        }),
      },
    }),
  },

  // ==============================================
  // COLLECTIONS
  // ==============================================
  collections: {
    // PAGES
    pages: collection({
      label: 'Seiten (flexibel)',
      slugField: 'title',
      path: 'content/pages/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Seiten-Slug' } }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
        isHomepage: fields.checkbox({ label: 'Startseite?' }),
        blocks: fields.blocks(
          {
            // HERO
            hero: {
              label: 'Hero Section',
              schema: fields.object({
                headline: fields.text({ label: 'H1 Headline', multiline: true }),
                subheadline: fields.text({ label: 'Subheadline', multiline: true }), // Was 'lead'
                ctaPrimary: fields.object({
                  text: fields.text({ label: 'Button Text' }), // Was 'label'
                  url: fields.text({ label: 'URL' }),
                }),
                ctaSecondary: fields.object({
                  text: fields.text({ label: 'Button/Link Text' }), // Was 'label'
                  url: fields.text({ label: 'URL' }),
                }),
                image: fields.image({
                  label: 'Hero Bild',
                  directory: 'public/images/hero',
                  publicPath: '/images/hero/',
                }),
                ctaPhone: fields.text({ label: 'Phone (Optional)' }), // Added to match existing data
              }),
            },

            // TRUST BAR (New block, keeping it)
            trustBar: {
              label: 'Trust Bar (3 Items)',
              schema: fields.object({
                items: fields.array(
                  fields.text({ label: 'Trust Item Text' }),
                  { label: 'Items', validation: { length: { min: 3, max: 3 } } }
                )
              })
            },

            // INTRO
            intro: {
              label: 'Intro',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift' }),
                subheadline: fields.text({ label: 'Subline / Firmenname' }),
                text: fields.text({ label: 'Text', multiline: true }),
                image: fields.image({
                  label: 'Bild',
                  directory: 'public/images/content',
                  publicPath: '/images/content/'
                }),
                icons: fields.array(fields.text({ label: 'Icon Name' }), { label: 'Icons (Alt)' }),
                links: fields.array(
                  fields.object({
                    label: fields.text({ label: 'Link Text' }),
                    url: fields.text({ label: 'URL' })
                  }),
                  { label: 'Links' }
                )
              })
            },

            // PARTNER SLIDER
            partnerSlider: {
              label: 'Partner Slider',
              schema: fields.object({
                title: fields.text({ label: 'Titel', defaultValue: 'Partner' }),
                logos: fields.array(
                  fields.object({
                    name: fields.text({ label: 'Partner Name' }),
                    logo: fields.image({
                      label: 'Logo',
                      directory: 'public/images/partners',
                      publicPath: '/images/partners/'
                    })
                  }),
                  { label: 'Partner Logos', itemLabel: (props) => props.fields.name.value }
                )
              })
            },

            // SERVICES (Restoring old block name for compatibility)
            services: {
              label: 'Dienstleistungen (Startseite)',
              schema: fields.object({
                title: fields.text({ label: 'Titel' }),
                subtitle: fields.text({ label: 'Untertitel' }), // Match existing data
                items: fields.array(
                  fields.object({
                    number: fields.text({ label: 'Nummer' }), // Match existing
                    title: fields.text({ label: 'Titel' }),
                    bullets: fields.array(fields.text({ label: 'Punkt' }), { label: 'Bullets' }),
                    // Additional fields for new design can stay optional or use defaults
                    linkUrl: fields.text({ label: 'Link URL' }),
                    image: fields.image({
                      label: 'Bild',
                      directory: 'public/images/services',
                      publicPath: '/images/services/'
                    })
                  }),
                  { label: 'Service Kacheln', itemLabel: (props) => props.fields.title.value }
                )
              })
            },

            // SERVICES TEASER (New block - keeping for manual addition)
            servicesTeaser: {
              label: 'Dienstleistungen Teaser (Neu)',
              schema: fields.object({
                title: fields.text({ label: 'Titel' }),
                intro: fields.text({ label: 'Intro Text', multiline: true }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Titel' }),
                    items: fields.array(fields.text({ label: 'Leistungspunkt' }), { label: 'Liste' }),
                    linkUrl: fields.text({ label: 'Link URL' }),
                    image: fields.image({
                      label: 'Hintergrundbild',
                      directory: 'public/images/services',
                      publicPath: '/images/services/'
                    })
                  }),
                  { label: 'Service Kacheln', itemLabel: (props) => props.fields.title.value }
                )
              })
            },

            // VALUES
            values: {
              label: 'Werte',
              schema: fields.object({
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Titel' }),
                    description: fields.text({ label: 'Beschreibung', multiline: true }),
                    icon: fields.text({ label: 'Icon Name' })
                  }),
                  { label: 'Werte', itemLabel: (props) => props.fields.title.value }
                )
              })
            },

            // TESTIMONIALS
            testimonials: {
              label: 'Kundenstimmen',
              schema: fields.object({
                title: fields.text({ label: 'Titel' }),
                items: fields.array(
                  fields.object({
                    quote: fields.text({ label: 'Zitat', multiline: true }),
                    author: fields.text({ label: 'Name' }),
                    role: fields.text({ label: 'Rolle/Firma' }),
                    rating: fields.integer({ label: 'Rating (1-5)' }) // Added back
                  }),
                  { label: 'Testimonials', itemLabel: (props) => props.fields.author.value }
                )
              })
            },

            // CONTACT FORM (Restoring old block)
            contactForm: {
              label: 'Kontakt Formular (Legacy)',
              schema: fields.object({
                headline: fields.text({ label: 'Headline' }),
                image: fields.image({ label: 'Image', directory: 'public/images/contact', publicPath: '/images/contact/' }),
                subjects: fields.array(fields.text({ label: 'Subject' }), { label: 'Subjects' })
              })
            },

            // CONTACT TEASER (New block)
            contactTeaser: {
              label: 'Kontakt Teaser (Neu)',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift' }),
                text: fields.text({ label: 'Text', multiline: true }),
              })
            },

            // JOB LIST
            jobList: {
              label: 'Job Liste (Automatisch)',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift', defaultValue: 'Offene Stellen' }),
                intro: fields.text({ label: 'Einleitungstext', multiline: true }),
              })
            },

            // TEAM GRID
            teamGrid: {
              label: 'Team Grid',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift' }),
                showMembers: fields.checkbox({ label: 'Team Mitglieder anzeigen', defaultValue: true }),
              })
            },

            // RICH TEXT
            richText: {
              label: 'Rich Text',
              schema: fields.object({
                content: fields.markdoc({ label: 'Inhalt' })
              })
            }
          },
          { label: 'Page Blocks' }
        ),
      },
    }),

    // SERVICES (Detaillierte Leistungsseiten)
    services: collection({
      label: 'Dienstleistungen',
      slugField: 'title',
      path: 'content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        subline: fields.text({ label: 'Subline (Hero)' }),
        shortDescription: fields.text({ label: 'Kurzbeschreibung (für Übersichten)', multiline: true }),
        icon: fields.image({
          label: 'Icon/Bild (Kachel Hintergrund)',
          directory: 'public/images/services',
          publicPath: '/images/services/'
        }),
        heroImage: fields.image({
          label: 'Hero Bild (Detailseite)',
          directory: 'public/images/services',
          publicPath: '/images/services/'
        }),

        blocks: fields.blocks({
          intro: {
            label: 'Intro Text (Haupttext)',
            schema: fields.object({
              headline: fields.text({ label: 'Headline' }),
              text: fields.text({ label: 'Text', multiline: true })
            })
          },
          featureGrid: {
            label: 'Icon Grid (Leistungsübersicht)',
            schema: fields.object({
              headline: fields.text({ label: 'Headline' }),
              items: fields.array(fields.object({
                title: fields.text({ label: 'Titel' }),
                description: fields.text({ label: 'Beschreibung' }),
                icon: fields.select({
                  label: 'Icon',
                  options: [
                    { label: 'Check', value: 'check' },
                    { label: 'Zap (Lightning)', value: 'zap' },
                    { label: 'Settings', value: 'settings' },
                    { label: 'Document', value: 'file' },
                    { label: 'Layers', value: 'layers' },
                    { label: 'Pen/Design', value: 'pen' },
                    { label: 'Layout', value: 'layout' },
                    { label: 'Shield', value: 'shield' }
                  ],
                  defaultValue: 'check'
                })
              }), { label: 'Items', itemLabel: (props) => props.fields.title.value })
            })
          },
          accordion: {
            label: 'Accordion (Kategorien)',
            schema: fields.object({
              headline: fields.text({ label: 'Headline' }),
              items: fields.array(fields.object({
                title: fields.text({ label: 'Titel' }),
                content: fields.text({ label: 'Inhalt', multiline: true })
              }), { label: 'Items', itemLabel: (props) => props.fields.title.value })
            })
          },
          timeline: {
            label: 'Timeline (Ablauf)',
            schema: fields.object({
              headline: fields.text({ label: 'Headline' }),
              steps: fields.array(fields.object({
                title: fields.text({ label: 'Titel' }),
                description: fields.text({ label: 'Beschreibung' })
              }), { label: 'Schritte', itemLabel: (props) => props.fields.title.value })
            })
          }
        }, { label: 'Service Blocks' }),

        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
      }
    }),



    // TEAM
    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'content/team/*',
      format: { data: 'json' },
      columns: ['name', 'department', 'role', 'order'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Position' }),
        department: fields.select({
          label: 'Abteilung',
          options: [
            { label: 'Führung & Projektleitung', value: 'management' },
            { label: 'Buchhaltung & Personal', value: 'office' },
            { label: 'Produktion', value: 'production' }
          ],
          defaultValue: 'production'
        }),
        order: fields.integer({ label: 'Sortierung (1=Chef, 2=Leiter...)' }),
        image: fields.image({
          label: 'Foto',
          directory: 'public/images/team',
          publicPath: '/images/team/',
        }),
        email: fields.text({ label: 'E-Mail (optional)' }),
        bio: fields.markdoc({ label: 'Bio / Beschreibung' }),
        socials: fields.array(
          fields.object({
            platform: fields.text({ label: 'Plattform (LinkedIn, Xing...)' }),
            url: fields.text({ label: 'URL' }),
          }),
          { label: 'Social Media Links', itemLabel: (props) => props.fields.platform.value || 'Link' }
        ),
      },
    }),

    // JOBS
    jobs: collection({
      label: 'Jobs & Karriere',
      slugField: 'title',
      path: 'content/jobs/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Job Titel' } }),
        location: fields.text({ label: 'Standort', defaultValue: 'Romanshorn / Amriswil' }),
        employmentType: fields.text({ label: 'Anstellungsart', defaultValue: 'Vollzeit' }),
        datePosted: fields.date({ label: 'Veröffentlichungsdatum', validation: { isRequired: true } }),
        description: fields.markdoc({ label: 'Job Beschreibung (Haupttext)' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
      },
    }),
  },
});

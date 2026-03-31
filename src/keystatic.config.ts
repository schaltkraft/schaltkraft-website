import { config, fields, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: 'github',
    repo: 'schaltkraft/schaltkraft-website',
  },

  // ==============================================
  // SINGLETONS
  // ==============================================
  singletons: {
    // HEADER NAVIGATION
    header: singleton({
      label: 'Header / Kopfzeile',
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
      label: 'Footer / Fusszeile',
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
        openingHours: fields.array(
          fields.object({
            days: fields.text({ label: 'Tage', description: 'z.B. "Mo - Do" oder "Fr"' }),
            times: fields.text({ label: 'Zeiten', description: 'z.B. "07:30 - 17:00"' }),
          }),
          {
            label: 'Öffnungszeiten',
            description: 'Wird im Footer, auf der Kontaktseite und im Kontakt-Formular angezeigt.',
            itemLabel: (props) => `${props.fields.days.value}: ${props.fields.times.value}`,
          }
        ),
      },
    }),

    // SEO DEFAULTS
    seoDefaults: singleton({
      label: 'SEO Einstellungen',
      path: 'content/global/seo',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Website Titel', description: '⚠️ EXPERTENEINSTELLUNG: Haupttitel für Google-Suchergebnisse. Nur mit SEO-Kenntnissen ändern!' }),
        siteDescription: fields.text({ label: 'Website Beschreibung', description: '⚠️ EXPERTENEINSTELLUNG: Beschreibung für Google-Suchergebnisse (max. 160 Zeichen). Nur mit SEO-Kenntnissen ändern!', multiline: true }),
        ogImage: fields.image({
          label: 'OG Image',
          description: '⚠️ EXPERTENEINSTELLUNG: Vorschaubild für Social Media (Facebook, LinkedIn, etc.). Nur mit SEO-Kenntnissen ändern!',
          directory: 'public/images/global',
          publicPath: '/images/global/',
        }),
      },
    }),

    // TEAM MITGLIEDER (Singleton mit 3 Abteilungen)
    teamMembers: singleton({
      label: 'Team-Mitglieder',
      path: 'content/global/team-members',
      format: { data: 'json' },
      schema: {
        // Führung & Projektleitung
        management: fields.array(
          fields.object({
            name: fields.text({ label: 'Name', validation: { isRequired: true } }),
            role: fields.text({ label: 'Position', validation: { isRequired: true } }),
            image: fields.image({
              label: 'Foto',
              directory: 'public/images/team',
              publicPath: '/images/team/',
            }),
          }),
          {
            label: 'Führung & Projektleitung',
            description: 'Geschäftsführung und Projektleiter',
            itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
          }
        ),

        // Buchhaltung & Personal
        office: fields.array(
          fields.object({
            name: fields.text({ label: 'Name', validation: { isRequired: true } }),
            role: fields.text({ label: 'Position', validation: { isRequired: true } }),
            image: fields.image({
              label: 'Foto',
              directory: 'public/images/team',
              publicPath: '/images/team/',
            }),
          }),
          {
            label: 'Buchhaltung & Personal',
            description: 'Büro und Administration',
            itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
          }
        ),

        // Produktion
        production: fields.array(
          fields.object({
            name: fields.text({ label: 'Name', validation: { isRequired: true } }),
            role: fields.text({ label: 'Position', validation: { isRequired: true } }),
            image: fields.image({
              label: 'Foto',
              directory: 'public/images/team',
              publicPath: '/images/team/',
            }),
          }),
          {
            label: 'Produktion',
            description: 'Fertigung und Montage',
            itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
          }
        ),
      },
    }),
  },

  // ==============================================
  // COLLECTIONS
  // ==============================================
  collections: {
    // ANLEITUNGEN (CMS-Dokumentation)
    anleitungen: collection({
      label: 'Anleitungen',
      slugField: 'title',
      path: 'content/anleitungen/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Anleitungs-Titel', description: 'Wird automatisch in eine URL umgewandelt (z.B. "Erste Schritte" → /anleitungen/erste-schritte)' } }),
        kategorie: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Für Benutzer (ohne Technik)', value: 'benutzer' },
            { label: 'Für Entwickler (technisch)', value: 'entwickler' },
          ],
          defaultValue: 'benutzer',
        }),
        content: fields.text({
          label: 'Inhalt',
          description: 'Die vollständige Anleitung (Markdown-Format möglich)',
          multiline: true,
        }),
      },
    }),

    // PAGES
    pages: collection({
      label: 'Seiten (flexibel)',
      slugField: 'title',
      path: 'content/pages/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Seiten-Slug', description: 'Bestimmt die URL der Seite (z.B. "ueber-uns" → /ueber-uns). Wird automatisch aus dem Titel generiert, kann aber angepasst werden.' } }),
        seoTitle: fields.text({ label: 'SEO Titel', description: '⚠️ EXPERTENEINSTELLUNG: Titel für Google-Suchergebnisse und Browser-Tab. Nur mit SEO-Kenntnissen ändern!' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', description: '⚠️ EXPERTENEINSTELLUNG: Kurze Beschreibung für Google-Suchergebnisse (max. 160 Zeichen). Nur mit SEO-Kenntnissen ändern!', multiline: true }),
        isHomepage: fields.checkbox({ label: 'Als Startseite verwenden', description: '⚠️ NICHT ÄNDERN! Diese Option ist nur für das System.' }),
        blocks: fields.blocks(
          {
            // HERO
            hero: {
              label: 'Grosser Startbereich',
              schema: fields.object({
                headline: fields.text({ label: 'Hauptüberschrift (H1)', description: 'Die wichtigste Überschrift der Seite', multiline: true }),
                subheadline: fields.text({ label: 'Unterüberschrift', description: 'Ergänzender Text unter der Hauptüberschrift', multiline: true }),
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

            // TRUST BAR
            trustBar: {
              label: 'Vertrauensleiste',
              schema: fields.object({
                items: fields.array(
                  fields.text({ label: 'Trust-Punkt', description: 'Kurzer Text (max. 5 Wörter)' }),
                  { label: 'Trust-Punkte (genau 3)', validation: { length: { min: 3, max: 3 } } }
                )
              })
            },

            // INTRO
            intro: {
              label: 'Text mit Bild',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift' }),
                subheadline: fields.text({ label: 'Subline', description: 'z.B. Firmenname oder Slogan' }),
                text: fields.text({ label: 'Haupttext', description: 'Der ausführliche Beschreibungstext', multiline: true }),
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
              label: 'Partner & Zertifikate',
              schema: fields.object({
                title: fields.text({ label: 'Titel', description: 'z.B. "Unsere Partner"', defaultValue: 'Partner' }),
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

            // SERVICES
            services: {
              label: 'Leistungs-Kacheln',
              schema: fields.object({
                title: fields.text({ label: 'Abschnitts-Titel', description: 'z.B. "Unsere Leistungen"' }),
                subtitle: fields.text({ label: 'Untertitel' }),
                items: fields.array(
                  fields.object({
                    number: fields.text({ label: 'Nummer', description: 'z.B. "01", "02"' }),
                    title: fields.text({ label: 'Service-Name' }),
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
              label: 'Werte / Vorteile',
              schema: fields.object({
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Titel' }),
                    description: fields.text({ label: 'Beschreibung', multiline: true }),
                    icon: fields.text({ label: 'Icon-Name', description: 'Lucide Icon Name (z.B. "check", "shield", "zap")' })
                  }),
                  { label: 'Werte', itemLabel: (props) => props.fields.title.value }
                )
              })
            },

            // TESTIMONIALS
            testimonials: {
              label: 'Kundenstimmen',
              schema: fields.object({
                title: fields.text({ label: 'Abschnitts-Titel', description: 'z.B. "Was unsere Kunden sagen"' }),
                items: fields.array(
                  fields.object({
                    quote: fields.text({ label: 'Zitat', description: 'Das Kundenzitat', multiline: true }),
                    author: fields.text({ label: 'Name des Kunden' }),
                    role: fields.text({ label: 'Position/Firma', description: 'z.B. "Geschäftsführer, Muster AG"' }),
                    rating: fields.integer({ label: 'Sterne-Bewertung', description: '1-5 Sterne' })
                  }),
                  { label: 'Testimonials', itemLabel: (props) => props.fields.author.value }
                )
              })
            },

            // CONTACT FORM
            contactForm: {
              label: 'Kontakt-Formular',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift' }),
                image: fields.image({ label: 'Bild (optional)', directory: 'public/images/contact', publicPath: '/images/contact/' }),
                subjects: fields.array(fields.text({ label: 'Betreff-Option' }), { label: 'Betreff-Auswahloptionen', description: 'Was kann der Besucher als Grund für die Anfrage wählen?' })
              })
            },

            // CONTACT TEASER
            contactTeaser: {
              label: 'Kontakt-Aufruf',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift', description: 'z.B. "Haben Sie Fragen?"' }),
                text: fields.text({ label: 'Text', description: 'Einladender Text für Kontaktaufnahme', multiline: true }),
              })
            },

            // JOB LIST
            jobList: {
              label: 'Stellenangebote',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift', defaultValue: 'Offene Stellen' }),
                intro: fields.text({ label: 'Einleitungstext', description: 'Optionaler Text vor der Stellenliste', multiline: true }),
              })
            },

            // TEAM GRID
            teamGrid: {
              label: 'Team-Übersicht',
              schema: fields.object({
                headline: fields.text({ label: 'Überschrift', description: 'z.B. "Unser Team"' }),
                showMembers: fields.checkbox({ label: 'Teammitglieder anzeigen', description: 'Deaktivieren um temporär zu verstecken', defaultValue: true }),
              })
            },

            // RICH TEXT
            richText: {
              label: 'Freier Textbereich',
              schema: fields.object({
                content: fields.markdoc({
                  label: 'Inhalt',
                  options: {
                    // Formatting options (divider removed for cleaner toolbar)
                    heading: [1, 2, 3, 4, 5, 6],
                    bold: true,
                    italic: true,
                    strikethrough: true,
                    code: true,
                    blockquote: true,
                    orderedList: true,
                    unorderedList: true,
                    codeBlock: true,
                    link: true,
                    table: true,
                    // Image upload configuration
                    image: {
                      directory: 'public/images/content',
                      publicPath: '/images/content/',
                    },
                  },
                  components: {
                    // Custom Image Block for inserting images
                    Bild: block({
                      label: 'Bild einfügen',
                      schema: {
                        image: fields.image({
                          label: 'Bild',
                          directory: 'public/images/content',
                          publicPath: '/images/content/',
                        }),
                        alt: fields.text({ label: 'Alt-Text (Beschreibung)' }),
                        caption: fields.text({ label: 'Bildunterschrift (optional)' }),
                        size: fields.select({
                          label: 'Bildgrösse',
                          options: [
                            { label: 'Klein (25%)', value: 'small' },
                            { label: 'Mittel (50%)', value: 'medium' },
                            { label: 'Gross (75%)', value: 'large' },
                            { label: 'Volle Breite (100%)', value: 'full' },
                          ],
                          defaultValue: 'medium',
                        }),
                        position: fields.select({
                          label: 'Ausrichtung',
                          options: [
                            { label: 'Links', value: 'left' },
                            { label: 'Zentriert', value: 'center' },
                            { label: 'Rechts', value: 'right' },
                          ],
                          defaultValue: 'center',
                        }),
                      },
                    }),
                  },
                })
              })
            },

            // TEXT MIT TEXT (Zwei Spalten)
            textText: {
              label: 'Text mit Text (Zwei Spalten)',
              schema: fields.object({
                titleLeft: fields.text({ label: 'Überschrift Links' }),
                textLeft: fields.text({ label: 'Text Links', multiline: true }),
                titleRight: fields.text({ label: 'Überschrift Rechts' }),
                textRight: fields.text({ label: 'Text Rechts', multiline: true })
              })
            },
            // JOB PERKS GALERIE
            jobPerksGallery: {
              label: 'Jobs & Perks Galerie',
              schema: fields.object({
                headline: fields.text({ label: 'Optionale Überschrift', description: 'Wird über der Galerie angezeigt (z.B. "Ihre Vorteile bei uns")' }),
                images: fields.array(
                  fields.object({
                    image: fields.image({
                      label: 'Bild',
                      directory: 'public/images/jobs',
                      publicPath: '/images/jobs/'
                    }),
                    alt: fields.text({ label: 'Alt-Text (SEO)', description: 'Kurze Beschreibung des Bildes für Suchmaschinen' })
                  }),
                  { label: 'Bilder (Genau 3)', validation: { length: { min: 3, max: 3 } } }
                ),
                perks: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Titel (z.B. 40)', description: 'Die grosse Hervorhebung' }),
                    subtitle: fields.text({ label: 'Untertitel (z.B. Stunden Woche)', description: 'Die kleinere Beschreibung' })
                  }),
                  { label: 'Highlights (Genau 2)', validation: { length: { min: 2, max: 2 } } }
                )
              })
            }
          },
          { label: 'Seiten-Abschnitte', description: 'Hier können Sie die einzelnen Abschnitte Ihrer Webseite bearbeiten, hinzufügen oder entfernen. Jeder Block repräsentiert einen eigenen Bereich auf der Seite (z.B. Hero, Dienstleistungen, Kontaktformular).' }
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
        title: fields.slug({ name: { label: 'Titel', description: 'Name der Dienstleistung - wird automatisch in eine URL umgewandelt (z.B. "Planung & Engineering" → /dienstleistungen/planung-engineering)' } }),
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

        seoTitle: fields.text({ label: 'SEO Titel', description: '⚠️ EXPERTENEINSTELLUNG: Titel für Google-Suchergebnisse. Nur mit SEO-Kenntnissen ändern!' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', description: '⚠️ EXPERTENEINSTELLUNG: Beschreibung für Google-Suchergebnisse (max. 160 Zeichen). Nur mit SEO-Kenntnissen ändern!' }),
      }
    }),



    // JOBS
    jobs: collection({
      label: 'Jobs & Karriere',
      slugField: 'title',
      path: 'content/jobs/*',
      format: { data: 'json' },
      columns: ['title', 'isActive', 'location', 'employmentType'],
      schema: {
        title: fields.slug({ name: { label: 'Stellentitel', description: 'Wird automatisch in eine URL umgewandelt (z.B. "Elektroinstallateur EFZ" → /jobs/elektroinstallateur-efz)' } }),
        isActive: fields.checkbox({
          label: 'Aktiv (online)',
          description: 'Deaktivieren um Stelle zu verstecken ohne zu löschen',
          defaultValue: true,
        }),
        location: fields.text({ label: 'Arbeitsort', defaultValue: 'Romanshorn' }),
        employmentType: fields.select({
          label: 'Anstellungsart',
          options: [
            { label: 'Vollzeit', value: 'Vollzeit' },
            { label: 'Teilzeit', value: 'Teilzeit' },
          ],
          defaultValue: 'Vollzeit',
        }),
        datePosted: fields.date({ label: 'Veröffentlichungsdatum', validation: { isRequired: true } }),
        seoTitle: fields.text({ label: 'SEO Titel', description: '⚠️ EXPERTENEINSTELLUNG: Titel für Google-Suchergebnisse (z.B. "Elektriker Job Romanshorn | Schaltkraft AG"). Nur mit SEO-Kenntnissen ändern!' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', description: '⚠️ EXPERTENEINSTELLUNG: Kurze Beschreibung für Google-Suchergebnisse (max. 160 Zeichen). Nur mit SEO-Kenntnissen ändern!', multiline: true }),

        // Alle Abschnitte der Jobbeschreibung (inkl. Intro)
        sections: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: '💼 Intro / Mission (Koffer)', value: 'briefcase' },
                { label: '🎯 Aufgaben (Target)', value: 'target' },
                { label: '👤 Profil / Anforderungen (Person)', value: 'user' },
                { label: '🎁 Benefits / Was wir bieten (Geschenk)', value: 'gift' },
                { label: '📧 Kontakt (Brief)', value: 'mail' },
              ],
              defaultValue: 'briefcase',
            }),
            title: fields.text({
              label: 'Abschnitts-Titel',
              description: 'z.B. "Deine Mission", "Deine Aufgaben", "Was du mitbringst", "Was wir bieten", "Kontakt"'
            }),
            text: fields.text({
              label: 'Fliesstext (optional)',
              description: 'Absatz-Text für diesen Abschnitt (ideal für Intro und Kontakt)',
              multiline: true,
            }),
            items: fields.array(
              fields.text({ label: 'Aufzählungspunkt' }),
              {
                label: 'Aufzählungspunkte (optional)',
                description: 'Liste von Punkten (ideal für Aufgaben, Profil, Benefits)',
                itemLabel: (props) => props.value?.substring(0, 50) || 'Neuer Punkt',
              }
            ),
          }),
          {
            label: 'Abschnitte der Jobbeschreibung',
            description: 'Fügen Sie Abschnitte hinzu: Intro/Mission, Aufgaben, Profil, Benefits, Kontakt',
            itemLabel: (props) => props.fields.title.value || 'Neuer Abschnitt',
          }
        ),


      },
    }),
  },
});

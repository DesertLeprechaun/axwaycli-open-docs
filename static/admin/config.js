/**
 * Docs page collections require the following minimal dataset:
 *   name: [string] used in routes, ie.: /admin/collections/:slug/edit
 *   label: [string] used in CMS UI left nav
 *   label_singular: [string] used in CMS UI, ie.: 'New Post'
 *   description: [string] used in CMS UI
 */
const docsDefaults = (contentDirectory, imageDirectory) => ({
  folder: `content/en/docs/${contentDirectory}`,
  media_folder: `{{media_folder}}/${imageDirectory}`,
  public_folder: `{{public_folder}}/${imageDirectory}`,
  preview_path: `docs/${contentDirectory}/{{filename}}/`,
  create: true, // Allow users to create new documents in this collection
  delete: false, // Allow users to delete documents in this collection
  format: 'json-frontmatter', // Specify frontmatter for YAML or json-frontmatter for JSON
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'linkTitle', widget: 'hidden', required: false },
    { name: 'no_list', widget: 'hidden', required: false },
    { name: 'simple_list', widget: 'hidden', required: false },
    { name: 'draft', widget: 'hidden', required: false },
    { name: 'weight', widget: 'hidden', required: false },
    { name: 'date', widget: 'hidden', required: false },
    { name: 'description', label: 'Summary', widget: 'text', required: false },
    { name: 'body', label: 'Body', widget: 'markdown' },
  ],
})

/**
 * Post collections require the same minimal dataset as docs pages.
 */
const postDefaults = {
  create: true,
  delete: false,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Author', name: 'author', widget: 'string' },
    { label: 'Publish Date', name: 'date', widget: 'datetime' },
    { label: 'Summary', name: 'description', widget: 'text' },
    { label: 'Image', name: 'image', widget: 'image', required: false },
    { label: 'Body', name: 'body', widget: 'markdown' },
  ],
}

/**
 * Add new collections here.
 */
 const collections = [{
  ...docsDefaults('', 'docbook/images/general'), // content directory, image directory
  name: 'docs',
  label: 'Documentation',
  description: 'Top level pages in Axway CLI documentation.',
  format: 'frontmatter',
  create: false,
}, {
  ...docsDefaults('quick_start', 'quick_start'),
  name: 'quick_start',
  label: 'Quick start',
  label_singular: 'page in Quick start section',
  description: 'All pages relating to Quick start section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('authentication', 'authentication'),
  name: 'authentication',
  label: 'Authentication',
  label_singular: 'page in authentication section',
  description: 'All pages relating to authentication section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('configuration', 'configuration'),
  name: 'configuration',
  label: 'Configuration',
  label_singular: 'page in Configuration section',
  description: 'All pages relating to Configuration section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('organization_&_user_management_(oum)', 'organization_&_user_management_(oum)'),
  name: 'organization_&_user_management_(oum)',
  label: 'Organization & user management (OUM)',
  label_singular: 'page in Organization & user management (OUM) section',
  description: 'All pages relating to Organization & user management (OUM) section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('package_management', 'package_management'),
  name: 'package_management',
  label: 'Package management',
  label_singular: 'page in Package management section',
  description: 'All pages relating to Package management section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('extensions', 'extensions'),
  name: 'extensions',
  label: 'Extensions',
  label_singular: 'page in Extensions section',
  description: 'All pages relating to Extensions section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('troubleshooting', 'troubleshooting'),
  name: 'troubleshooting',
  label: 'Troubleshooting',
  label_singular: 'page in Troubleshooting section',
  description: 'All pages relating to Troubleshooting section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('release_notes', 'release_notes'),
  name: 'release_notes',
  label: 'Release notes',
  label_singular: 'page in Release notes section',
  description: 'All pages relating to Release notes section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('contribution_guidelines', 'contribution_guidelines'),
  name: 'contribution_guidelines',
  label: 'Contribution guidelines',
  label_singular: 'page in Contribution guidelines section',
  description: 'All pages relating to Contribution guidelines section.',
  format: 'frontmatter',
},];

const cms_branch = window.location.hostname.includes('develop') ? 'develop' : 'master'; // Additional config for a develop branch and develop site

const config = {
  backend: {
    name: 'github',
    branch: cms_branch,
    repo: 'Axway/axwaycli-open-docs', // Path to your GitHub repository.
    open_authoring: true,
  },
  publish_mode: 'editorial_workflow',
  media_folder: '/static/Images', // Media files will be stored in the repo under static/Images
  public_folder: '/Images', // The src attribute for uploaded media will begin with /Images
  site_url: 'https://axwaycli-open-docs.netlify.app/', // URL to netlify site
  collections,
};

// Make the config object available on the global scope for processing by
// subsequent scripts.Don't rename this to `CMS_CONFIG` - it will cause the
// config to be loaded without proper processing.
window.CMS_CONFIGURATION = config;

CMS.init({ config })

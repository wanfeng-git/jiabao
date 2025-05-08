import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCompanyProfile extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_profiles';
  info: {
    displayName: 'company_profile';
  };
  attributes: {
    introduce: Schema.Attribute.Text;
    introduce_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedProductsTechnologies extends Struct.ComponentSchema {
  collectionName: 'components_shared_products_technologies';
  info: {
    displayName: 'products_technologies';
  };
  attributes: {
    products_detailed: Schema.Attribute.Text;
    products_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    products_title: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedScale extends Struct.ComponentSchema {
  collectionName: 'components_shared_scales';
  info: {
    displayName: 'scale';
  };
  attributes: {
    infrastructure: Schema.Attribute.String;
    people_equipment: Schema.Attribute.String;
  };
}

export interface SharedSectionsRepeatable extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections_repeatables';
  info: {
    description: '';
    displayName: 'sections.repeatable';
  };
  attributes: {
    content: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SlideSlide extends Struct.ComponentSchema {
  collectionName: 'components_slide_slides';
  info: {
    displayName: 'slide';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.company-profile': SharedCompanyProfile;
      'shared.media': SharedMedia;
      'shared.products-technologies': SharedProductsTechnologies;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.scale': SharedScale;
      'shared.sections-repeatable': SharedSectionsRepeatable;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'slide.slide': SlideSlide;
    }
  }
}

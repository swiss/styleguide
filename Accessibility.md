# Accessibility

## What is accessibility?

**Web accessibility means that people with disabilities can use the Web.**
More specifically, Web accessibility means that people with disabilities can
perceive, understand, navigate, and interact with the Web, and that they can
contribute to the Web. Web accessibility also benefits others, including older
people with changing abilities due to aging.

Web accessibility encompasses all disabilities that affect access to the Web,
including visual, auditory, physical, speech, cognitive, and neurological
disabilities. The document "How People with Disabilities Use the Web"
describes how different disabilities affect Web use and includes scenarios of
people with disabilities using the Web.

Millions of people have disabilities that affect their use of the Web.
Currently most Web sites and Web software have accessibility barriers that
make it difficult or impossible for many people with disabilities to use the
Web. As more accessible Web sites and software become available, people with
disabilities are able to use and contribute to the Web more effectively.

Web accessibility also benefits people without disabilities. For example, a
key principle of Web accessibility is designing Web sites and software that
are flexible to meet different user needs, preferences, and situations. This
flexibility also benefits people without disabilities in certain situations,
such as people using a slow Internet connection, people with "temporary
disabilities" such as a broken arm, and people with changing abilities due to
aging. The document "Developing a Web Accessibility Business Case for Your
Organization" describes many different benefits of Web accessibility,
including benefits for organizations.

*source [W3C](http://www.w3.org/WAI/intro/accessibility.php)*

## Why this is important

An accessible web is important to let everyone experience the web **equally**.
The Administration requires such standards to give equal access to information
that is important for everyone.

## Accessibility for the Swiss Administration

Accessibility is required on websites for the Swiss Administration. All the
good practices and standards from [WCAG](http://www.w3.org/WAI/intro/wcag.php)
should be used. 

### WAI-ARIA standards

The styleguide includes all the `aria-` attributes that should be used. Keep
in mind to always update them accordingly and to run some tests.
More documentation on `aria-` attributes can be found on
[www.w3.org](http://www.w3.org/TR/wai-aria/).

### Screen Readers

We optimized the styleguide for the [NVDA](http://www.nvaccess.org/) screen
reader. It is the most used screen reader and is fully free and open source.
We suggest testing every component with this tool. All these requirements
should be met.

- Tabbing through the page is smooth and logical.
- No useless element (eg: an icon before a link) is being read by the screen
reader
- All navigations or unclear buttons/links/info should be preceded by a title
with the standard Bootstrap class `sr-only` that explains what the following
element is about. 
- All table rows and columns should be clearly read by the screen reader
- All key events should behave as you'd expect.


### Checklist

Please refer to the
[Accessibility Checklist](http://www.accessibility-checklist.ch/) for a good
starting point. 

Another checklist from webaim.org: [http://webaim.org/standards/wcag/checklist](http://webaim.org/standards/wcag/checklist).

### Bootstrap

Bootstrap has a few starting classes and indicate some good references you
can find on their
[site](http://getbootstrap.com/getting-started/#accessibility).
Please refer to them and don't create new classes or behaviors.
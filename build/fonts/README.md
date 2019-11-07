# Frutiger
The Confederation Web Guidelines should come with Frutiger as the main font. But due to [licence](LICENSE) restrictions, the font files cannot be distributed on this repository.
A copy can be obtained on the [federal chancellery intranet]( 
https://intranet.bk.admin.ch/bk-intra/de/home/dl-koordination-bund/kommunikation/webforum-bund/Downloads.html) or directly requested per email: [webforum@bk.admin.ch](mailto:webforum@bk.admin.ch). The font files then have to be copied into the `src/assets/fonts` directory.
 
According to the Frutiger [licence](LICENSE), the font files have to be protected. Each project should ensure that only allowed domains have access the font. The proposed solution is to check that the REFERER http header is present and contains the project's domain.  

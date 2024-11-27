import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";
import { 
  LinkedInLogoIcon,
  GlobeIcon
 } from "@radix-ui/react-icons";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="flex justify-between">
          <div className="flex flex-col w-full">
            <h1>Rayandra Valera</h1>
            <h2 className="font-normal text-muted">software, ux, product designer</h2>
          </div>
          <a href="https://linkedin.com/in/rayandra" target="_blank" rel="noreferrer">
          <LinkedInLogoIcon className="h-4 w-4 mr-4" />
          </a>
          <a href="https://dribbble.com/rayvaltra" target="_blank" rel="noreferrer">
          <GlobeIcon className="h-4 w-4 rotate-[-10deg]" />
          </a>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <p>
        I simplify complex system into user-friendly interface through user research and design iteration. I’ve built designs that helps to generate million dollars of revenue.
        </p>
      </FadeIn.Item>
      <FadeIn.Item>
        <Posts category="projects" />
      </FadeIn.Item>
      <FadeIn.Item>
        <Posts category="examples" />
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}

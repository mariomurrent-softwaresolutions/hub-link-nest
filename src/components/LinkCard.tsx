import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface LinkCardProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

const LinkCard = ({ title, description, url, image }: LinkCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full transition-transform hover:scale-[1.02]"
    >
      <Card className="h-full overflow-hidden border-border shadow-card transition-all hover:shadow-card-hover">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="line-clamp-1 text-foreground transition-colors group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
};

export default LinkCard;

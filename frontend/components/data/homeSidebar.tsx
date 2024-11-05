import { siteConfig } from "@/config/site";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Link,
} from "@nextui-org/react";
import { Book, Mail } from "lucide-react";

export function HomeSidebar({
  progressPercentage,
  completedQuestions,
  totalQuestions,
}) {
  return (
    <div className="flex flex-col w-full md:w-1/3 gap-4">
      <Card className="p-5">
        <CardHeader className="justify-center font-bold">
          Your progress
        </CardHeader>
        <CardBody className="items-center">
          <CircularProgress
            classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              value: "text-3xl font-semibold text-white",
            }}
            value={progressPercentage}
            color="primary"
            showValueLabel={true}
          />
        </CardBody>
        <CardFooter className="justify-center">
          <p className="text-sm">
            {completedQuestions} out of {totalQuestions} questions
          </p>
        </CardFooter>
      </Card>
      {/* show links to contact us or guides  */}
      <Card className="p-5">
        <CardHeader className="font-bold justify-center">Need help?</CardHeader>
        <CardBody>
          <Link
            isExternal
            showAnchorIcon
            href={siteConfig.contact_email}
            anchorIcon={<Mail className="ml-2" />}
          >
            Our email
          </Link>
          <Link
            isExternal
            showAnchorIcon
            href={siteConfig.guideline_link}
            anchorIcon={<Book className="ml-2" />}
          >
            Annotation Guideline
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

import {
  createStyles,
  Header as ThemeHeader,
  Menu,
  Group,
  Center,
  Container,
  Text,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function Header({ links }) {
  const { classes } = useStyles();

  return (
    <ThemeHeader height={56} mb={120}>
      <Container>
        <div className={classes.inner}>
          <h3>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "black", to: "blue" }}
              inherit
            >
              Blogger
            </Text>
          </h3>

          <Group spacing={5} className={classes.links}>
            {links.map((link, index) => (
              <Link key={index} to={link.link} className={classes.link}>
                {link.label}
              </Link>
            ))}
          </Group>

          <Group position="center">
            <Link to="/auth/signin">
              <Button variant="primary">Войти в аккаунт</Button>
            </Link>
          </Group>
        </div>
      </Container>
    </ThemeHeader>
  );
}

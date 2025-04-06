<?php

namespace App\Entity;

use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EventRepository::class)]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: false)] // Contrainte unique annulé
    private ?string $nom = null;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\Universite')]
    #[ORM\JoinColumn(name: 'id_univ', referencedColumnName: 'id', nullable: false, onDelete: 'CASCADE'),] // Non nullable
    private ?Universite $universite = null;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\User')]
    #[ORM\JoinColumn(name: 'id_user', referencedColumnName: 'id', nullable: false, onDelete: 'CASCADE')] // Non nullable
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: false)] // Non nullable
    private ?string $img = null;

    #[ORM\Column(type: 'text', nullable: false)] // Non nullable
    private ?string $content = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: false)] // Non nullable
    private ?\DateTimeImmutable $date = null;

    // Getters and Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;
        return $this;
    }

    public function getUniversite(): ?Universite
    {
        return $this->universite;
    }

    public function setUniversite(?Universite $universite): static
    {
        $this->universite = $universite;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): static
    {
        $this->img = $img;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;
        return $this;
    }
}
?>